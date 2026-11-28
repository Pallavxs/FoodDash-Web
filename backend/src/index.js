import express from "express";
import morgan from "morgan";
import config from "./config/config.js";
import authRoute from "./routes/auth.route.js";
import restaurantRoute from "./routes/restaurant.route.js";
import menuRoute from "./routes/menu.route.js";
import orderRoute from "./routes/order.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (
                allowedOrigins.includes(origin) ||
                origin.endsWith(".vercel.app") ||
                !process.env.NODE_ENV ||
                process.env.NODE_ENV !== "production"
            ) {
                return callback(null, true);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/menu", menuRoute);
app.use("/api/orders", orderRoute);


export default app;
