import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    paymentProvider: {
      type: String,
      enum: ["stripe", "esewa"],
      required: true,
    },
    transactionId: {
      type: String,
    },
    sessionId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentResponse: {
      type: Object,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
