const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.post("/", async (req, res) => {
  try {
    const { skills } = req.body;

    const jobs = await Job.find();

    let results = jobs.map(job => {
      const matched = job.requiredSkills.filter(skill =>
        skills.includes(skill)
      );

      const matchScore =
        (matched.length / job.requiredSkills.length) * 100;

      const missing = job.requiredSkills.filter(skill =>
        !skills.includes(skill)
      );

      return {
        ...job._doc,
        matchScore,
        missingSkills: missing
      };
    });

    // 🔥 Sort
    results.sort((a, b) => b.matchScore - a.matchScore);

    // 🔥 Filter ≥ 70
    let filtered = results.filter(j => j.matchScore >= 70);

    // 🔥 Ensure minimum 5
    if (filtered.length < 5) {
      filtered = results.slice(0, 5);
    }

    // 🔥 Limit max 8
    const finalResults = filtered.slice(0, 8);

    res.json(finalResults);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;