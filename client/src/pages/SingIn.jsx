import axios from "axios";
import { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import {signStart, signSuccess, signFailure, clearError} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../componets/Footer";


export default function SingIn() {
  const [form, setForm] = useState({});
  const {loading, error} =useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(clearError());
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signStart());
      
      const response = await axios.post("/api/auth/signin", form);
      if (response.data.sussess === false) {
        dispatch(signFailure(response.data));
      }
      dispatch(signSuccess(response.data));
      navigate("/dashboard");
    } catch(error) {
      dispatch(signFailure(error.response.data));
    }
  }
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-auto  sm:px-6 lg:px-8 animate-fade-in">
        <div className="mx-auto max-w-lg bg-gray-900 rounded-xl py-5">
          <h1 className="text-center text-3xl font-bold text-white sm:text-5xl uppercase">
            Sign In
          </h1>
          <form
            action="#"
            className="mb-0 mt-3 space-y-4 rounded-lg p-8 sm:p-8 lg:p-8 text-slate-300" 
            onSubmit={handleSubmit}
          >
            <p className="text-center text-xl font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm text-black font-semibold shadow-sm text hover:opacity-90"
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
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm text-black font-semibold shadow-sm hover:opacity-90"
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

            <button
              type="submit"
              className="block w-full rounded-lg bg-[#5386e4] px-5 py-3 text-sm font-medium text-white hover:opacity-80 uppercase"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-500 ">
              No account?
              <Link className=" text-[#00AF54] hover:opacity-70" to="/signup">
                Sign up
              </Link>
            </p>
          </form>
          <p className="text-center text-sm text-red-500">{error ? error.message || 'Something went wrong!' : ''}</p>
        </div>
      </div>
      <Footer/>
    </>
  );
}
