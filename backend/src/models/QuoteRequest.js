import mongoose from "mongoose";

const quoteRequestSchema = new mongoose.Schema(
  {
    client: {
      nom: { type: String, required: true },
      prenom: { type: String, required: true },
      societe: { type: String },
      email: { type: String, required: true },
      telephone: { type: String, required: true },
    },
    project: {
      typeService: { type: String, required: true },
      description: { type: String, required: true },
      quantite: { type: Number, default: 1 },
      matiere: { type: String },
      couleur: { type: String },
      delai: { type: String },
    },
    files: [
      {
        originalName: String,
        storedName: String,
        url: String,
        mimeType: String,
        size: Number,
      },
    ],
    status: {
      type: String,
      enum: ["new", "in_review", "quoted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("QuoteRequest", quoteRequestSchema);
