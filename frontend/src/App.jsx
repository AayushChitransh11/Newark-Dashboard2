import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Participants from "./pages/Participants";
import ServiceProvider from "./pages/ServiceProvider";
import "./index.css";
import { useEffect, useState } from "react";
import TableauEmbed from "./pages/TableauViz";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Newark Crime Prevention & Recovery Dashboard</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/participant">Participant Page</Link>
            <Link to="/service-provider">Service Provider Page</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} AI for Social Good at NJIT. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/participant" element={<Participants />} />
        <Route path="/service-provider" element={<ServiceProvider />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
