import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["impression_3d", "conception_electronique", "decoupe_laser"],
      required: true,
    },
    
    status: { type: String, enum: ["active", "coming_soon"], default: "active" },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
