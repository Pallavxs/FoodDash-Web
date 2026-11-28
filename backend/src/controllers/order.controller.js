import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Menu from "../models/menu.model.js";
import Restaurant from "../models/restarunt.model.js";
import Payment from "../models/payment.model.js";
import { emitOrderStatus } from "../socket/socket.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { items, deliveryAddress, paymentMethod, riderLocation, deliveryLocation } = req.body;
    const restaurantId = req.body.restaurant || req.body.restaurantId;

    if (!restaurantId || !mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "A valid restaurant ID is required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    // 1. Verify restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (
      !restaurant.coordinates?.lat ||
      !restaurant.coordinates?.lng
    ) {
      return res.status(400).json({
        message: "Restaurant location is not available",
      });
    }

    // 2. Validate menu items and calculate total amount from DB prices
    let calculatedTotal = 0;
    const processedItems = [];

    for (const item of items) {
      const menuItemId = item.menuItem || item.id || item._id;
      if (!menuItemId || !mongoose.Types.ObjectId.isValid(menuItemId)) {
        return res.status(400).json({ message: `Invalid menu item ID: ${menuItemId}` });
      }

      const menuItem = await Menu.findById(menuItemId);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item not found: ${menuItemId}` });
      }

      // Ensure menu item belongs to the restaurant being ordered from
      if (menuItem.restaurant.toString() !== restaurantId.toString()) {
        return res.status(400).json({
          message: `Dish "${menuItem.name}" does not belong to ${restaurant.name}`,
        });
      }

      const qty = Math.max(1, Number(item.quantity) || 1);
      calculatedTotal += Number(menuItem.price) * qty;

      processedItems.push({
        menuItem: menuItem._id,
        quantity: qty,
      });
    }

    // 3. Normalize payment method
    let normalizedMethod = "COD";
    const methodInput = (paymentMethod || "").toUpperCase();
    if (methodInput.includes("UPI")) {
      normalizedMethod = "UPI";
    } else if (methodInput.includes("CARD")) {
      normalizedMethod = "Card";
    }

    // 4. Create Order document
    const orderData = {
      user: userId,
      restaurant: restaurant._id,
      items: processedItems,
      totalAmount: calculatedTotal,
      paymentMethod: normalizedMethod,
      deliveryAddress: deliveryAddress || "",
      status: "placed",
    };

    if (restaurant.coordinates?.lat != null && restaurant.coordinates?.lng != null) {
      orderData.restaurantLocation = {
        lat: Number(restaurant.coordinates.lat),
        lng: Number(restaurant.coordinates.lng),
      };
    }

    if (deliveryLocation?.lat != null && deliveryLocation?.lng != null) {
      orderData.deliveryLocation = {
        lat: Number(deliveryLocation.lat),
        lng: Number(deliveryLocation.lng),
      };
    }

    if (riderLocation?.lat != null && riderLocation?.lng != null) {
      orderData.riderLocation = {
        lat: Number(riderLocation.lat),
        lng: Number(riderLocation.lng),
      };
    }

    const order = await Order.create(orderData);

    // 5. Create Payment document (Step 5: Simulated payment)
    const transactionId = `FD_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const payment = await Payment.create({
      order: order._id,
      user: userId,
      amount: calculatedTotal,
      method: normalizedMethod,
      status: "paid",
      transactionId,
      paidAt: new Date(),
    });

    order.payment = payment._id;
    await order.save();

    // 6. Populate order for immediate client display
    const populatedOrder = await Order.findById(order._id)
      .populate("restaurant", "name location image phone cuisine")
      .populate("items.menuItem", "name price image category")
      .populate("payment")
      .populate("user", "name email");

    return res.status(201).json({
      message: "Order created successfully",
      _id: order._id,
      id: order._id,
      orderId: order._id,
      order: populatedOrder,
      payment,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return res.status(500).json({
      message: "Internal server error while creating order",
      error: error.message,
    });
  }
};

/**
 * GET /api/orders
 * Returns all orders belonging ONLY to the authenticated customer.
 */
export const getOrders = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const orders = await Order.find({ user: userId })
      .populate("restaurant", "name image location cuisine phone coordinates")
      .populate("items.menuItem", "name price image category")
      .populate("payment")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("GET CUSTOMER ORDERS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch your orders",
      error: error.message,
    });
  }
};

/**
 * GET /api/orders/restaurant
 * Returns orders for restaurants owned by the authenticated vendor.
 */
export const getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.user._id || req.user.id;

    // 1. Find all restaurants owned by this vendor
    const vendorRestaurants = await Restaurant.find({ owner: vendorId }).select("_id");
    const restaurantIds = vendorRestaurants.map((r) => r._id);

    if (restaurantIds.length === 0) {
      return res.status(200).json([]);
    }

    // 2. Find all orders belonging to those restaurants
    const orders = await Order.find({ restaurant: { $in: restaurantIds } })
      .populate("restaurant", "name location image phone")
      .populate("items.menuItem", "name price image category")
      .populate("user", "name email phone")
      .populate("payment")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("GET VENDOR ORDERS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch vendor orders",
      error: error.message,
    });
  }
};

/**
 * GET /api/orders/:id
 * Returns a single order if the requester is the customer who placed it,
 * the vendor who owns the restaurant, or an admin.
 */
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(orderId)
      .populate("restaurant", "name location image phone cuisine owner coordinates")
      .populate("items.menuItem", "name price image category")
      .populate("payment")
      .populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const currentUserId = (req.user._id || req.user.id).toString();
    const orderCustomerId = order.user?._id?.toString() || order.user?.toString();
    const restaurantOwnerId = order.restaurant?.owner?.toString();
    const isAdmin = req.user.role === "admin";

    // Security check: Only customer, restaurant vendor, or admin can access
    if (orderCustomerId !== currentUserId && restaurantOwnerId !== currentUserId && !isAdmin) {
      return res.status(403).json({
        message: "Forbidden: You are not authorized to view this order",
      });
    }

    const orderData = order.toObject();
    if (!orderData.restaurantLocation && orderData.restaurant?.coordinates) {
      orderData.restaurantLocation = orderData.restaurant.coordinates;
    }

    return res.status(200).json(orderData);
  } catch (error) {
    console.error("GET ORDER BY ID ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
};

/**
 * PATCH /api/orders/:id/status
 * Vendor or Admin updates an order's status.
 * Enforces strict lifecycle: placed -> preparing -> out_for_delivery -> delivered
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const allowedStatuses = ["placed", "preparing", "out_for_delivery", "delivered"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid order status. Allowed statuses: ${allowedStatuses.join(", ")}`,
      });
    }

    const order = await Order.findById(orderId).populate("restaurant");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Security check: Verify vendor owns this restaurant, admin, or customer completing active delivery
    const currentUserId = (req.user._id || req.user.id).toString();
    const orderCustomerId = (order.user?._id || order.user)?.toString();
    const restaurantOwnerId = order.restaurant?.owner?.toString();
    const isAdmin = req.user.role === "admin";

    const isCustomerCompletingDelivery =
      orderCustomerId === currentUserId &&
      order.status === "out_for_delivery" &&
      status === "delivered";

    const isAuthorizedVendorOrAdmin =
      restaurantOwnerId === currentUserId || isAdmin;

    if (!isAuthorizedVendorOrAdmin && !isCustomerCompletingDelivery) {
      return res.status(403).json({
        message: "Forbidden: You are not authorized to update this order's status",
      });
    }

    // Lifecycle transition rules:
    const validTransitions = {
      placed: ["preparing"],
      preparing: ["out_for_delivery"],
      out_for_delivery: ["delivered"],
      delivered: [],
    };

    // If attempting the same status, allow as idempotent
    if (order.status !== status) {
      const allowedNext = validTransitions[order.status] || [];
      if (!allowedNext.includes(status)) {
        return res.status(400).json({
          message: `Cannot transition order status from "${order.status}" to "${status}". Allowed next step: ${allowedNext.join(", ") || "none (order is final)"}`,
        });
      }
    }

    if (status === "out_for_delivery") {
      order.rider = {
        name: "Rahul",
        phone: "9876543210",
        vehicle: "Bike",
        vehicleNumber: "MP04AB1234",
      };

      const restLat = order.restaurantLocation?.lat ?? order.restaurant?.coordinates?.lat;
      const restLng = order.restaurantLocation?.lng ?? order.restaurant?.coordinates?.lng;

      if (restLat != null && restLng != null) {
        order.restaurantLocation = {
          lat: Number(restLat),
          lng: Number(restLng),
        };

        if (!order.riderLocation?.lat || !order.riderLocation?.lng) {
          order.riderLocation = {
            lat: Number(restLat),
            lng: Number(restLng),
          };
        }
      }
    }

    if (status === "delivered") {
      if (order.deliveryLocation?.lat != null && order.deliveryLocation?.lng != null) {
        order.riderLocation = {
          lat: Number(order.deliveryLocation.lat),
          lng: Number(order.deliveryLocation.lng),
        };
      }
    }

    order.status = status;
    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate("restaurant", "name location image phone cuisine owner coordinates")
      .populate("items.menuItem", "name price image category")
      .populate("user", "name email phone")
      .populate("payment");

    // Real-time socket notification if configured
    try {
      const customerId = updatedOrder.user?._id?.toString() || updatedOrder.user?.toString();
      emitOrderStatus(updatedOrder._id, updatedOrder.status, customerId);
    } catch {
      // Non-blocking
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);
    return res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

/**
 * PATCH /api/orders/:id/location
 * Reserved for rider location updates.
 */
export const updateRiderLocation = async (req, res) => {
  try {
    const { riderLocation } = req.body;

    if (
      !riderLocation ||
      typeof riderLocation.lat !== "number" ||
      typeof riderLocation.lng !== "number"
    ) {
      return res.status(400).json({
        message: "Valid rider location ({ lat, lng }) is required",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { riderLocation },
      { returnDocument: "after" }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("UPDATE RIDER LOCATION ERROR:", error);
    return res.status(500).json({
      message: "Failed to update rider location",
      error: error.message,
    });
  }
};
