import Stripe from "stripe";
import mongoose from "mongoose";
import { order as Order } from "../model/order.model.js";
import { Payment } from "../model/payment.model.js";

const getStripeClient = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is missing in environment");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

export const createStripePaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid orderId",
      });
    }

    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (existingOrder.isPaid) {
      return res.status(400).json({
        success: false,
        message: "Order is already paid",
      });
    }

    const amount = Math.round(Number(existingOrder.totalPrice) * 100);
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order total for payment",
      });
    }

    const stripe = getStripeClient();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: (process.env.STRIPE_CURRENCY || "usd").toLowerCase(),
      metadata: {
        orderId: existingOrder._id.toString(),
        userId: existingOrder.user?.toString() || "",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const paymentRecord = await Payment.create({
      user: existingOrder.user,
      order: existingOrder._id,
      paymentProvider: "stripe",
      transactionId: paymentIntent.id,
      amount: existingOrder.totalPrice,
      currency: (process.env.STRIPE_CURRENCY || "usd").toUpperCase(),
      status: "pending",
      paymentResponse: paymentIntent,
    });

    existingOrder.payment = paymentRecord._id;
    await existingOrder.save();

    return res.status(200).json({
      success: true,
      message: "Stripe payment intent created",
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      orderId: existingOrder._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create Stripe payment intent",
      error: error.message,
    });
  }
};

export const confirmStripePayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "paymentIntentId is required",
      });
    }

    const stripe = getStripeClient();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const paymentRecord = await Payment.findOne({ transactionId: paymentIntentId });

    if (!paymentRecord) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    if (paymentIntent.status !== "succeeded") {
      paymentRecord.status = "failed";
      paymentRecord.paymentResponse = paymentIntent;
      await paymentRecord.save();

      return res.status(400).json({
        success: false,
        message: "Payment is not successful",
        stripeStatus: paymentIntent.status,
      });
    }

    paymentRecord.status = "completed";
    paymentRecord.paidAt = new Date();
    paymentRecord.paymentResponse = paymentIntent;
    await paymentRecord.save();

    const existingOrder = await Order.findById(paymentRecord.order);
    if (existingOrder) {
      existingOrder.isPaid = true;
      existingOrder.paidAt = new Date();
      await existingOrder.save();
    }

    return res.status(200).json({
      success: true,
      message: "Payment confirmed successfully",
      stripeStatus: paymentIntent.status,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to confirm Stripe payment",
      error: error.message,
    });
  }
};
