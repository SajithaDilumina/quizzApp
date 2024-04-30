import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scoreboard = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const correct = searchParams.get("correct");
  const milliseconds = parseInt(searchParams.get("time"));

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  useEffect(() => {
    // Make an HTTP POST request to send the data to the backend
    axios
      .post("http://localhost:8070/results", {
        correctAnswers: correct,
        milliseconds: milliseconds,
      })
      .then((response) => {
        console.log("Result saved successfully");
      })
      .catch((error) => {
        console.error("Error saving result:", error);
      });
  }, [correct, milliseconds]);

  console.log("Correct Answers:", correct);
  console.log("Time Taken:", minutes + " mins " + remainingSeconds + " secs");

  return (
    <div>
      <h1>Scoreboard!</h1>
      <p>Correct Answers: {correct}</p>
      <p>
        Time Taken: {minutes} mins {remainingSeconds} secs
      </p>
    </div>
  );
};

export default Scoreboard;
