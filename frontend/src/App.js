// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Particles from "./components/Particles";
import Features from "./components/Features";
import Footer from "./components/Footer";

/* PAGES */
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Colleges from "./pages/Colleges";
import JobHunting from "./pages/JobHunting";
import Dashboard from "./pages/Dashboard";

/* QUIZ */
import CareerQuizHub from "./pages/CareerQuizHub";
import CareerQuizPage from "./pages/CareerQuizPage";

/* HOOKS */
import useScrollToTop from "./hooks/useScrollToTop";

function AppContent() {
  const location = useLocation();
  useScrollToTop();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <>
      {location.pathname === "/" && <Particles />}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <Footer />
            </>
          }
        />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/job-hunting" element={<JobHunting />} />
        <Route path="/career-quiz" element={<CareerQuizHub />} />

        {/* ✅ Added /quiz route */}
        <Route path="/quiz" element={<CareerQuizPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
