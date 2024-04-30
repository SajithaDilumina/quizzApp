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

// Other routes related to results can be defined here if needed

module.exports = router;
