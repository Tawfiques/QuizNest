import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function getRemainingTime(endDate) {
  const now = new Date();
  if (endDate < now) {
    return { expired: true };
  }
  const diff = endDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return {
    days,
    hours,
    minutes,
    expired: false,
  };
}

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getQuizzes() {
      try {
        const response = await axios.get("/api/quiz/all");
        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    getQuizzes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/quiz/delete/${id}`);
      if (response.status === 200) {
        alert("Quiz Deleted");
        setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="sm:ml-64 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg h-48 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="sm:ml-64 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 animate-fade-in">
          {quizzes.map((quiz) => {
            const { days, hours, minutes, expired } = getRemainingTime(
              new Date(quiz.endDate)
            );
            return (
              <article
                key={quiz._id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="flex items-center justify-between">
                  <time className="text-xs font-bold uppercase text-[#4C4B63]">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(quiz.startDate))}
                  </time>
                  <time className="text-xs font-bold uppercase text-[#4C4B63]">
                    {expired
                      ? "TIMES UP!"
                      : `${days} days, ${hours} hours and ${minutes} minutes`}
                  </time>
                </div>

                <h3 className="font-bold uppercase text-[#4C4B63] mt-4">
                  {quiz.title}
                </h3>

                <div className="mt-2 sm:mt-6 flex sm:flex-row flex-col justify-between sm:gap-4 gap-2">
                  <a
                    className="bg-yellow-500 px-5 py-3 text-center text-xs font-bold uppercase rounded-lg text-white transition hover:bg-red-600/80 sm:w-auto w-full"
                    onClick={() => handleDelete(quiz._id)}
                  >
                    Delete
                  </a>
                  <a
                    className="bg-[#00AF54] px-5 py-3 text-center text-xs font-bold uppercase rounded-lg text-white transition hover:bg-[#00AF54]/80 sm:w-auto w-full"
                    onClick={() => navigate(`/dashboard/quiz/edit/${quiz._id}`)}
                  >
                    Enter
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

