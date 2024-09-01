import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import Header from "./componets/Header";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./componets/PrivateRoute";


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/features" element={<Features />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
