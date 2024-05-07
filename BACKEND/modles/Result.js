const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  correctAnswers: Number,
  timeTaken: Number,
  UserID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
