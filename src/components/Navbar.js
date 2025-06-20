// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId'); // Remove user ID as well
  navigate("/");
};


  return (
    <nav>
      <h2 style={{ color: 'white' }}>Inventory Manager</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/inventory">My Inventory</Link>
            <Link to="/add">Add Item</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
