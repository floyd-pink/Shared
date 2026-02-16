import express from "express";
import isAuthenticated from "../middleware/isauthenticated.js";
import {
  createStripePaymentIntent,
  confirmStripePayment,
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/stripe/create-intent", isAuthenticated, createStripePaymentIntent);
router.post("/stripe/confirm", isAuthenticated, confirmStripePayment);

export default router;
