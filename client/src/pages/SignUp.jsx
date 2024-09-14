import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [form, setForm] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setError(false); // Reset error state when component mounts
  }, []);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false)
      const response = await axios.post("/api/auth/signup", form); 
      setLoading(false);
      if (response.data.success === false) {
        setError(response.data.message);
        
      } else {
        navigate("/signin");
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);      
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-auto  sm:px-6 lg:px-8 animate-fade-in">
        <div className="mx-auto max-w-lg bg-gray-900 rounded-xl py-10">
          <h1 className="text-center text-3xl font-semibold text-white sm:text-3xl">
            Get started today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-slate-300">
            Unlock a world of exciting quizzes and challenges
          </p>

          <form
            className="mb-0 mt-3 space-y-4 rounded-lg p-8 sm:p-8 lg:p-8 text-slate-300"
            onSubmit={handleSubmit}
          >
            <p className="text-center text-xl font-medium uppercase">Sign up</p>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="sr-only">
                  First name
                </label>
                <div className="relative">
                  <input
                    id="firstName"
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black font-semibold hover:opacity-90"
                    placeholder="First name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="sr-only">
                  Last name
                </label>
                <div className="relative">
                  <input
                    id="lastName"
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black font-semibold hover:opacity-90"
                    placeholder="Last name"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black font-semibold hover:opacity-90"
                  placeholder="Enter email"
                  onChange={handleChange}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black font-semibold hover:opacity-90"
                  placeholder="Enter password"
                  onChange={handleChange}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                RePassword
              </label>

              <div className="relative">
                <input
                  id="RePassword"
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black font-semibold hover:opacity-90"
                  placeholder="Re-enter password"
                  onChange={handleChange}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <button disabled={loading}
              type="submit"
              className="block w-full rounded-lg bg-[#00AF54] px-5 py-3 text-sm font-medium text-white hover:opacity-80 uppercase"
            >
              {loading ? "Loading..." : "Sign up"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Got an account?
              <Link className=" text-[#5386e4] hover:opacity-70" to="/signin">
                Sign in
              </Link>
            </p>
            <p className="text-center text-sm text-red-500">{error ? error.message || 'Something went wrong!' : ''}</p>
          </form>
        </div>
      </div>
    </>
  );
}
