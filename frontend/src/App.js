import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionForm from "./components/QuestionForm";
import AllQuestions from "./components/AllQuestions";
import EditQuestions from "./components/EditQuestions";
import Introduction from "./components/Introduction";
import Question from "./components/Question";
import QuizIndroduction from "./components/QuizIndroduction";
import Scoreboard from "./components/Scoreboard";
import Footer from "./components/Footer";
import NavBar from "./components/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/quiz" element={<Question />} />
        <Route path="/add" element={<QuestionForm />} />
        <Route path="/all" element={<AllQuestions />} />
        <Route path="all/update/:id" element={<EditQuestions />} />
        <Route path="/intro" element={<QuizIndroduction />} />
        <Route path="/score" element={<Scoreboard />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/navbar" element={<NavBar />} />
      </Routes>
    </Router>
  );
}

export default App;
