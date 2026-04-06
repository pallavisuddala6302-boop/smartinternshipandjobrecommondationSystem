function matchJobs(userSkills, jobs) {
  let results = jobs.map(job => {
    let matchCount = job.requiredSkills.filter(skill =>
      userSkills.includes(skill)
    ).length;

    let score = (matchCount / job.requiredSkills.length) * 100;

    let missing = job.requiredSkills.filter(skill =>
      !userSkills.includes(skill)
    );

    return {
      ...job._doc,
      matchScore: score,
      missingSkills: missing
    };
  });

  // 🔥 Sort by highest match
  results.sort((a, b) => b.matchScore - a.matchScore);

  // 🔥 Filter jobs with >= 70% match
  let highMatches = results.filter(job => job.matchScore >= 70);

  // 🔥 Ensure at least 5 jobs
  if (highMatches.length < 5) {
    return results.slice(0, 5);
  }

  return highMatches;
}

module.exports = matchJobs;