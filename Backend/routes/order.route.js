import express from "express";

const router = express.Router();
import { createOrder, getAllOrders, getOrderById, cancleOrder } from "../controller/order.contoller.js";
import isAuthenticated from "../middleware/isauthenticated.js";

router.post("/order/create",isAuthenticated, createOrder);
router.get("/orders",isAuthenticated, getAllOrders);
router.get("/order/:id",isAuthenticated, getOrderById);
router.delete("/order/:id",isAuthenticated, cancleOrder);

export default router ;
