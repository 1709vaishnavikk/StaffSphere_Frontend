import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
  const navigate = useNavigate();

  const handleNavClick = (e, path) => {
    // Check if the path contains 'update' or 'delete' and prevent navigation if not logged in
    if (!isLoggedIn && (path.includes("update") || path.includes("delete"))) {
      e.preventDefault(); // Prevent navigation if not logged in
      navigate("/login"); // Redirect to login page
    }
  };

  const id = 1; // Example ID, replace with actual dynamic ID logic

  return (
    <nav className="navbar">
      <div className="navbar-left">STAFFSPHERE</div>
      <div className="navbar-center">
        <Link to="/">Home</Link> {/* Home link */}
        <Link to="/view-list">View List</Link>
        <Link to={"/login"} >Update</Link> {/* Dynamic path */}
        <Link to={"/login"} >Delete</Link> {/* Dynamic path for delete */}
      </div>
      <div className="navbar-right">
        
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
