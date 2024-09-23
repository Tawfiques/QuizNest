import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";
import SignIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import Header from "./componets/Header";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./componets/PrivateRoute";
import CreateQuiz from "./pages/CreateQuiz";
import CreateQuestion from "./pages/CreateQuestion";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="createquiz" element={<CreateQuiz />} />
          <Route path="quiz/edit/:quizId" element={<CreateQuestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

