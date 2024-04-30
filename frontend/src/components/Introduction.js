import React from "react";
import "./styles/Introduction.css";
import { Link } from "react-router-dom";

export default function Introduction() {
  return (
    <div className="container">
      <h1>Welcome to the Quiz!</h1>
      <p>
        Are you ready to test your knowledge? This quiz covers a variety of
        topics and challenges you with interesting questions. Click the button
        below to explore all the questions or start the quiz right away!
      </p>
      <div className="button-container">
        <Link to={"/all"}>
          <button className="action-button">All Questions</button>
        </Link>
        <Link to={"/intro"}>
          <button className="action-button">Start Quiz</button>
        </Link>
      </div>
    </div>
  );
}
