import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import axios from "axios";
import SideBar from "./SideBar";
import logo from "./assests/QUIZNEST.svg";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await axios.get("/api/auth/signout");
      dispatch(signOut());
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-gray-900 animate-fade-in">
        <div className="px-4 py-1 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="relative flex items-center justify-between">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <Link
                  to="/features"
                  className="font-medium tracking-wide text-gray-100 hover:opacity-80"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-medium tracking-wide text-gray-100 hover:opacity-80"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="font-medium tracking-wide text-gray-100 hover:opacity-80"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                {currentUser ? (
                  <button
                    className="font-medium tracking-wide text-gray-100 hover:opacity-80"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/SignIn"
                    className="font-medium tracking-wide text-gray-100 hover:opacity-80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
            <div className="lg:hidden">
              <button
                className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full animate-fade-in">
                  <div className="p-5 bg-white border rounded shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <button
                          className=" animate fade-out p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg
                            className="w-5 text-gray-600"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                      <ul
                        className="space-y-4 "
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <li>
                          <Link
                            to="/"
                            className="font-bold tracking-wide text-gray-700 transition-colors duration-200 hover:opacity-80"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            QUIZ<span className="text-[#5386e4]">NEST</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/features"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:opacity-80"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Features
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/about"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:opacity-80"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            About us
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:opacity-80"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          {currentUser ? (
                            <button
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:opacity-80"
                              onClick={handleSignOut}
                            >
                              Sign Out
                            </button>
                          ) : (
                            <Link
                              to="/SignIn"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:opacity-80"
                            >
                              Sign In
                            </Link>
                          )}
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {currentUser && location.pathname.startsWith("/dashboard") && <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />}
    </>
  );
}
