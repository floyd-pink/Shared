import express from "express";

const router = express.Router();
import { createOrder, getOrders ,getOrderbyId,cancleorder} from "../controllers/order.controller.js";
import isAuthenticated from "../middleware/isauthenticated.js";

router.post("/order/create",isAuthenticated, createOrder);
router.get("/orders",isAuthenticated, getOrders);
router.get("/order/:id",isAuthenticated, getOrderbyId);
router.delete("/order/:id",isAuthenticated, cancleorder);

export default router ;