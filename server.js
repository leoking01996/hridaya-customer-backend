// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");

// const app = express();

// app.use(cors({
//     origin: true,
//     credentials: true
// }));



// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => {
//     console.error("MongoDB Error:", err);
//     process.exit(1);
//   });

// const authRoutes = require("./routes/auth");

// app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//     res.json({
//         success: true,
//         message: "Hridaya Customer Backend is Running 🚀"
//     });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log("Server running");
// });

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Error:", err);
    process.exit(1);
  });

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hridaya Customer Backend is Running 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});