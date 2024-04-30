import React from "react";
import { Link } from "react-router-dom";
import "./styles/QuizIntroduction.css";

export default function QuizIntroduction() {
  return (
    <div className="container1">
      <h1>Welcome to the Quiz!</h1>
      <p>
        <b>
          Are you ready to test your knowledge? Here are the rules for the quiz:
        </b>
      </p>
      <ol>
        <li>There are 10 questions in total.</li>
        <li>A timer will start after answering the first question.</li>
        <li>You'll have a limited time to answer each question.</li>
        <li>Each correct answer earns you points.</li>
        <li>At the end of the quiz, you'll see your score.</li>
      </ol>
      <Link to={"/quiz"}>
        <button className="start-button">Start Quiz</button>
      </Link>
    </div>
  );
}
