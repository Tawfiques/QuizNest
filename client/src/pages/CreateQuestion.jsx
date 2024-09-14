import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CreateQuestion() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getQuiz() {
      try {
        const response = await axios.get(`/api/quiz/edit/${quizId}`);
        if (response.status === 200) {
            setQuiz(response.data);
            setQuestions(response.data.questions || []);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.response?.data?.message || "Something went wrong");
      }
    }
    getQuiz();
  }, [quizId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/quiz/question/add", { quizId, newQuestion });
      console.log(response.data);
      if (response.status === 201) {
        setQuestions((prevQuestions) => [...prevQuestions, response.data.question]);
        setNewQuestion({
          text: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        });
        setError(null);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="sm:ml-64">Loading...</div>;

  return (
    <div className="sm:ml-64 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 p-4 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:max-w-md mx-auto shadow-lg rounded-lg p-4">
        <h1 className="text-3xl text-center text-[#4C4B63] font-bold">Create Question for {quiz.title}</h1>
        <input
          type="text"
          name="text"
          value={newQuestion.text}
          onChange={handleChange}
          placeholder="Question Text"
          className="p-2 rounded-lg w-full"
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold">Options:</label>
          <input
            type="text"
            name="option1"
            value={newQuestion.option1}
            onChange={handleChange}
            placeholder="Option 1"
            className="p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="option2"
            value={newQuestion.option2}
            onChange={handleChange}
            placeholder="Option 2"
            className="p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="option3"
            value={newQuestion.option3}
            onChange={handleChange}
            placeholder="Option 3"
            className="p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="option4"
            value={newQuestion.option4}
            onChange={handleChange}
            placeholder="Option 4"
            className="p-2 rounded-lg w-full"
          />
        </div>
        <input
          type="text"
          name="answer"
          value={newQuestion.answer}
          onChange={handleChange}
          placeholder="Answer"
          className="p-2 rounded-lg w-full"
        />
        {error && <p className="text-center text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 p-2 rounded-lg text-white w-full">
          Save
        </button>
      </form>
      <div className="flex flex-col gap-4 w-full md:max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold">Questions:</h2>
        <ul className="list-disc pl-4 space-y-4">
          {questions && questions.map((question) => (
            <li key={question._id} className="flex flex-col gap-2 p-4 border border-gray-300 rounded-lg">
              <p className="font-bold text-lg">{question.text}</p>
              <ul className="list-disc pl-4 space-y-2">
                {question.options && question.options.map((option) => <li key={option} className="text-gray-700">{option}</li>)}
              </ul>
              <p className="font-bold text-gray-700">Answer: {question.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateQuestion;

