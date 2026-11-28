import { body, validationResult } from "express-validator";

const validateError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: errors.array()[0]?.msg });
    }
    next();
};

export const validateOrder = [
    body().custom((body) => {
        const restId = body.restaurant || body.restaurantId;
        if (!restId) {
            throw new Error("Restaurant ID is required");
        }
        return true;
    }),

    body("items")
        .isArray({ min: 1 })
        .withMessage("Items must be an array with at least one item"),

    body("items.*").custom((item) => {
        const menuItemId = item.menuItem || item.id || item._id;
        if (!menuItemId) {
            throw new Error("Menu item ID is required for each item");
        }
        const qty = Number(item.quantity);
        if (!qty || qty < 1) {
            throw new Error("Quantity must be at least 1 for each item");
        }
        return true;
    }),

    validateError,
];
