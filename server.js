const recommendRoutes = require("./routes/recommendRoutes");
const jobRoutes = require("./routes/jobRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/recommend", recommendRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

mongoose.connect("mongodb://127.0.0.1:27017/careerDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000 🔥");
});
