import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "pasword is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
