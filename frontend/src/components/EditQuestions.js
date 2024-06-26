import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/EditQuestions.css";

const EditQuestions = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctOption: 0,
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "options") {
      const updatedOptions = [...question.options];
      updatedOptions[index] = value;
      setQuestion({ ...question, options: updatedOptions });
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8070/questions/${id}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/questions/update/${id}`, question)
      .then(() => {
        navigate("/all");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div id="formContainer">
      <h1>Edit Questions</h1>
      <form id="questionForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question Text:</label>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Options:</label>
          {question.options.map((option, index) => (
            <input
              key={index}
              type="text"
              name="options"
              value={option}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>
        <div className="form-group">
          <label>Correct Option:</label>
          <select
            name="correctOption"
            value={question.correctOption}
            onChange={handleChange}
          >
            {question.options.map((option, index) => (
              <option key={index} value={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Question</button>
      </form>
    </div>
  );
};

export default EditQuestions;
