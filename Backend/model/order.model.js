import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        name: String,
        image: String,
        quantity: Number,
        price: Number,
      },
    ],
    shippingAddress: {
      fullName: String,
      phone: String,
      city: String,
      district: String,
      province: String,
      postalCode: String,
      street: String,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

export const order = mongoose.model("order", orderSchema);
