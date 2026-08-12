import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff", "customer"], default: "customer" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
