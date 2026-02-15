import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    amount: Number,
    category: String,
    date: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);
