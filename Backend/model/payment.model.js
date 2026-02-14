import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    paymentProvider: {
      type: String,
      enum: ["stripe", "esewa"],
      required: true,
    },

    transactionId: {
      type: String, // Stripe paymentIntent id or eSewa refId
    },

    sessionId: {
      type: String, // Stripe checkout session id
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "NPR",
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },

    paymentResponse: {
      type: Object, // store full stripe/esewa response
    },

    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);