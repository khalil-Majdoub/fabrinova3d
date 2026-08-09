import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    
    price: { type: Number, default: null },
    dimensions: { type: String },
    material: { type: String },
    colors: [{ type: String }],
    images: [{ type: String }],
    category: { type: String },
    ctaType: { type: String, enum: ["quote", "order"], default: "quote" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
