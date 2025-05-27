import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: { type: String, enum: ["user", "assistant"] },
  content: String,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);