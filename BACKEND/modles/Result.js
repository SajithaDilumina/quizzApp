const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  correctAnswers: Number,
  timeTaken: Number,
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
