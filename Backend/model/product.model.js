import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    instock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        name: String,
        rating: Number,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

export const product = mongoose.model("product", productSchema);
