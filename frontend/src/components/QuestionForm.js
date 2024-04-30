import React, { useState } from "react";
import axios from "axios";
import "./styles/QuestionForm.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate question text
    if (!questionText.trim()) {
      toast.error("Question text is required");
      return;
    }

    // Validate options
    const trimmedOptions = options.map((option) => option.trim());
    if (trimmedOptions.some((option) => !option)) {
      toast.error("All options are required");
      return;
    }
    if (new Set(trimmedOptions).size !== trimmedOptions.length) {
      toast.error("Options must be unique");
      return;
    }
    if (trimmedOptions.length < 4) {
      toast.error("All four options are required");
      return;
    }
    if (
      trimmedOptions.some((option) => option.length < 2 || option.length > 50)
    ) {
      toast.error("Option text must be between 2 and 50 characters");
      return;
    }

    // Validate correct option
    if (correctOption < 0 || correctOption >= trimmedOptions.length) {
      toast.error("Invalid correct option");
      return;
    }

    // If all validations pass, submit the form
    try {
      await axios.post("http://localhost:8070/questions/add", {
        questionText,
        options: trimmedOptions,
        correctOption,
      });

      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectOption(0);

      toast.success("Question added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit question");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Question:</label>
      <input
        type="text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        required
      />

      <label>Options:</label>
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) =>
            setOptions([
              ...options.slice(0, index),
              e.target.value,
              ...options.slice(index + 1),
            ])
          }
          required
        />
      ))}

      <label>Correct Option:</label>
      <select
        value={correctOption}
        onChange={(e) => setCorrectOption(parseInt(e.target.value))}
      >
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;
