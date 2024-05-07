const express = require("express");
const router = express.Router();
const Result = require("../modles/Result");

// Endpoint to save results data
router.post("/", async (req, res) => {
  try {
    const { correctAnswers, milliseconds } = req.body;

    // Convert milliseconds to seconds
    const totalSeconds = Math.floor(milliseconds / 1000);

    // Create a new result entry
    const result = new Result({
      correctAnswers,
      timeTaken: totalSeconds,
    });

    // Save the result to the database
    await result.save();

    res.status(201).json({ message: "Result saved successfully" });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/scores", async (req, res) => {
  try {
    // Retrieve all results from the database
    const results = await Result.find();

    // Sort the results based on correct answers (descending) and time taken (ascending)
    results.sort((a, b) => {
      if (a.correctAnswers !== b.correctAnswers) {
        return b.correctAnswers - a.correctAnswers;
      } else {
        return a.timeTaken - b.timeTaken;
      }
    });

    // Send the sorted results to the frontend
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Other routes related to results can be defined here if needed

module.exports = router;
