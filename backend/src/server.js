import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB, databaseIsConnected } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import productRoutes from "./routes/product.routes.js";
import realisationRoutes from "./routes/realisation.routes.js";
import quoteRoutes from "./routes/quote.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/realisations", realisationRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.get("/api/health", (req, res) => {
  const database = databaseIsConnected() ? "connected" : "disconnected";
  res.status(database === "connected" ? 200 : 503).json({ ok: database === "connected", database });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
