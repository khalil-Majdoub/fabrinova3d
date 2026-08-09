import mongoose from "mongoose";

const realisationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technology: { type: String },
    material: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Realisation", realisationSchema);
