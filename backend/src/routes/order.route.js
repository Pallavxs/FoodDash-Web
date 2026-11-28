import express from "express";
import {
  createOrder,
  getOrders,
  getVendorOrders,
  getOrderById,
  updateOrderStatus,
  updateRiderLocation,
} from "../controllers/order.controller.js";
import { authenticaUser } from "../middleware/auth.middleware.js";
import { validateOrder } from "../validator/order.validator.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/create", authenticaUser, validateOrder, createOrder);

router.get("/restaurant", authenticaUser, authorizeRoles("vendor", "admin"), getVendorOrders);

router.get("/", authenticaUser, getOrders);

router.get("/:id", authenticaUser, getOrderById);

router.patch("/:id/status", authenticaUser, updateOrderStatus);

router.patch("/:id/location", authenticaUser, updateRiderLocation);

export default router;
