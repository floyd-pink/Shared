import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "dotenv";
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import categoryRoute from "./routes/category.route.js";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js";
import paymentRoute from "./routes/payment.route.js";

env.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8000"],
    credentials: true,
  })
);

connectDb();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
