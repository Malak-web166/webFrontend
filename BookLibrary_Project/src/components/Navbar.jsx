import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar glass-card">
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">Libra<span>ry</span></span>
        </Link>
        
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/books" className={isActive('/books') ? 'active' : ''}>Browse</Link>
          </li>
          <li>
            <Link to="/books/new" className="btn btn-primary nav-cta">Add Book</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;