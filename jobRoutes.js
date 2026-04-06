const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Add Job API
router.post("/add", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();

    res.json({ message: "Job added successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;