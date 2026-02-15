import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // ✅ ADD THIS
import { fileURLToPath } from "url"; // ✅ ADD THIS
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Needed for ES module __dirname support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// 🔥 Serve React Frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/(.*)", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
