import express from "express";
import mongoose from "mongoose";
// cors does not currently ship TypeScript declarations in this project.
// @ts-expect-error Missing declaration file for the JavaScript-only cors package.
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";

import transactionRoutes from "./routes/transactionRoutes";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.log("❌ MongoDB Connection Error:", error);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("Financial Dashboard API Running...");
});

// Transaction Routes
app.use(
  "/api/transactions",
  transactionRoutes
);
// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});