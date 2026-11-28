import Restaurant from "../models/restarunt.model.js";
import mongoose from "mongoose";

export async function getRestaurants(req, res) {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });

    res.status(200).json({ data: restaurants });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getMyRestraunt(req, res) {
  try {
    const userId = req.user?._id || req.user?.id;
    const restaurants = await Restaurant.find({
      owner: userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: restaurants || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export async function getRestaurantById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid restaurant id" });
    }
    
    const restaurant = await Restaurant.findById(id);
    
    console.log("Fetching restaurant with id:", id);
    
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ data: restaurant });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function searchRestaurants(req, res) {
  try {
    // Accept query as `query` or `keyword` (fallback to `q` for legacy)
    const { query, keyword, q } = req.query;
    const searchTerm = query || keyword || q;
    console.log('Search Query:', req.query);
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }
    const regex = new RegExp(searchTerm, "i");

    // Search only name and cuisine as per spec
    const restaurants = await Restaurant.find({
      $or: [{ name: regex }, { cuisine: regex }],
    }).sort({ createdAt: -1 });
    res.status(200).json({ data: restaurants });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function createRestaurant(req, res) {
  try {
    const { name, cuisine, location, deliveryTime, rating, Openinghours, description } = req.body;

    let imageUrl = "";

    if (req.file) {
      imageUrl = req.file.path;
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "Restaurant image is required" });
    }

    const existingRestaurant = await Restaurant.findOne({ name });
    if (existingRestaurant) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    // Parse coordinates if provided
    let coordinates = null;
    if (req.body.coordinates) {
      if (typeof req.body.coordinates === "string") {
        try {
          coordinates = JSON.parse(req.body.coordinates);
        } catch {
          coordinates = null;
        }
      } else if (typeof req.body.coordinates === "object") {
        coordinates = req.body.coordinates;
      }
    } else if (req.body["coordinates[lat]"] !== undefined && req.body["coordinates[lng]"] !== undefined) {
      coordinates = {
        lat: req.body["coordinates[lat]"],
        lng: req.body["coordinates[lng]"],
      };
    } else if (req.body.lat !== undefined && req.body.lng !== undefined) {
      coordinates = {
        lat: req.body.lat,
        lng: req.body.lng,
      };
    }

    let parsedCoordinates = undefined;
    if (coordinates && coordinates.lat != null && coordinates.lng != null) {
      const lat = Number(coordinates.lat);
      const lng = Number(coordinates.lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        parsedCoordinates = { lat, lng };
      }
    }

    const restaurantData = {
      owner: req.user.id || req.user._id,
      name,
      cuisine,
      location,
      Openinghours,
      image: imageUrl,
      deliveryTime: Number(deliveryTime) || 30,
      description,
      rating: rating || 0,
    };

    if (parsedCoordinates) {
      restaurantData.coordinates = parsedCoordinates;
    }

    const newRestaurant = new Restaurant(restaurantData);

    const savedRestaurant = await newRestaurant.save();

    return res.status(201).json({ data: savedRestaurant });
  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({ message: "Restaurant with this name already exists" });
    }
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function editRestaurant(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      cuisine,
      location,
      deliveryTime,
      description,
      Openinghours
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid restaurant id",
      });
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    const userId = (req.user?._id || req.user?.id || "").toString();
    const ownerId = (restaurant.owner || "").toString();

    if (ownerId !== userId && req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const updateData = {};

    if (name) updateData.name = name;
    if (cuisine) updateData.cuisine = cuisine;
    if (location) updateData.location = location;
    if (deliveryTime) updateData.deliveryTime = Number(deliveryTime);
    if (description) updateData.description = description;
    if (Openinghours) updateData.Openinghours = Openinghours;
    if (req.body.rating !== undefined && req.body.rating !== "") updateData.rating = req.body.rating;

    if (req.file) {
      updateData.image = req.file.path;
    }

    // Parse coordinates if provided
    let coordinates = null;
    if (req.body.coordinates) {
      if (typeof req.body.coordinates === "string") {
        try {
          coordinates = JSON.parse(req.body.coordinates);
        } catch {
          coordinates = null;
        }
      } else if (typeof req.body.coordinates === "object") {
        coordinates = req.body.coordinates;
      }
    } else if (req.body["coordinates[lat]"] !== undefined && req.body["coordinates[lng]"] !== undefined) {
      coordinates = {
        lat: req.body["coordinates[lat]"],
        lng: req.body["coordinates[lng]"],
      };
    } else if (req.body.lat !== undefined && req.body.lng !== undefined) {
      coordinates = {
        lat: req.body.lat,
        lng: req.body.lng,
      };
    }

    if (coordinates && coordinates.lat != null && coordinates.lng != null) {
      const lat = Number(coordinates.lat);
      const lng = Number(coordinates.lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        updateData.coordinates = { lat, lng };
      }
    }

    const updatedRestaurant =
      await Restaurant.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      data: updatedRestaurant,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export async function deleteRestaurant(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid restaurant id",
      });
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    const userId = (req.user?._id || req.user?.id || "").toString();
    const ownerId = (restaurant.owner || "").toString();

    if (ownerId !== userId && req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await Restaurant.findByIdAndDelete(id);

    res.status(200).json({
      message: "Restaurant deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

