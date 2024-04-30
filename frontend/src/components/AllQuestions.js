import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/AllQuestions.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchContainer from "./SearchContainer";

export default function AllQuestions() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const questionsPerPage = 4;
  const pagesVisited = pageNumber * questionsPerPage;

  useEffect(() => {
    function getQuestions() {
      axios
        .get("http://localhost:8070/questions")
        .then((res) => {
          setQuestions(res.data);
          setFilteredQuestions(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getQuestions();
  }, []);

  const handleDelete = (id, event) => {
    event.preventDefault();

    const confirmation = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmation) {
      axios
        .delete(`http://localhost:8070/questions/delete/${id}`)
        .then(() => {
          console.log("Question deleted successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.error("Error deleting question:", err);
        });
    } else {
      console.log("Delete action cancelled");
    }
  };

  const handleSearch = (searchText) => {
    const filtered = questions.filter(
      (question) =>
        question.questionText
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        question.options.some((option) =>
          option.toLowerCase().includes(searchText.toLowerCase())
        )
    );
    setFilteredQuestions(filtered);
    setPageNumber(0);
  };

  const displayQuestions = filteredQuestions
    .slice(pagesVisited, pagesVisited + questionsPerPage)
    .map((question, index) => (
      <tr key={index}>
        <td>{question.questionText}</td>
        <td>
          <ol>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>{option}</li>
            ))}
          </ol>
        </td>
        <td className="col-2">{question.correctOption + 1}</td>
        <td className="icon-cell">
          <Link to={`update/${question._id}`}>
            <FontAwesomeIcon className="icon" icon={faPen} />
          </Link>
        </td>
        <td className="icon-cell">
          <Link
            to={`delete/${question._id}`}
            onClick={(event) => handleDelete(question._id, event)}
          >
            <FontAwesomeIcon className="icon" icon={faTrash} />
          </Link>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(filteredQuestions.length / questionsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className="top-right-container">
        <div className="search">
          <SearchContainer onSearch={handleSearch} />
        </div>
        <div className="add-questions">
          <Link to="/add">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} className="plus" />
              Add Questions
            </button>
          </Link>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th className="col-4">Question</th>
              <th className="col-4">Options</th>
              <th className="col-2">Correct Option</th>
              <th className="icon-cell"></th>
              <th className="icon-cell"></th>
            </tr>
          </thead>
          <tbody>{displayQuestions}</tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
