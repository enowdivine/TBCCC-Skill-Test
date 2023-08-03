import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userid is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
