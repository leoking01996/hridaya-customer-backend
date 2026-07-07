// // Load environment variables,So you can use.env file
// require("dotenv").config();

// const path = require("path");
// // express → creates server
// const express = require("express");

// // mongoose → connects MongoDB
// const mongoose = require("mongoose");

// // cors → allows frontend to talk to backend
// const cors = require("cors");

// // Creates your backend server instance
// const app = express();

// // Middleware
// // Allows requests from frontend
// app.use(cors({
//   origin: ["http://localhost:5173", "http://localhost:8080"],
//   credentials: true
// }));

// // app.use(express.json());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// // DB ------------
// // DB ------------
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // Routes
// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);
// app.get("/healthz", (req, res) => {
//   res.status(200).send("OK");
// });
// console.log("UPLOAD PATH:", path.join(__dirname, "uploads"));
// // 🔥 serve uploads folder (IMPORTANT FIX)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// CORS (Allow All)
// ======================
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Logger
// ======================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log("Origin:", req.headers.origin);
  next();
});

// ======================
// Static Uploads
// ======================
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// ======================
// Routes
// ======================
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

// ======================
// MongoDB
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("DB:", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });