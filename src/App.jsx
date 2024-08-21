// import router
import React, { useState } from "react";
import AppRoutes from "./routes"; // Import your routes
import { Link } from "react-router-dom";
import "./App.css"; // Ensure to create this file for additional styles

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            HOME
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={toggleSidebar}>
              ×
            </button>
            <ul className="sidebar-nav">
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  href="https://santrikoding.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link active"
                  aria-current="page"
                >
                  MRNURIHSANN
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="hero-section">
        <h1>Welcome to Our Application!</h1>
        <p>Your journey starts here.</p>
      </div>

      <div className="container mt-5">
        <AppRoutes />
      </div>
    </div>
  );
}
