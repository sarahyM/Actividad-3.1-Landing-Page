import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    habitacionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habitacion",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
