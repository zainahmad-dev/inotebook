import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const NavBar = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-semibold" to="/">Notexia</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-4">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          <div className="d-flex gap-2 align-items-center">
            {token && (
              <input
                type="text"
                className="form-control search-navbar"
                placeholder="🔍 Search notes..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ maxWidth: '250px', borderRadius: '8px' }}
              />
            )}
            <div className="d-flex gap-2">
              {!token ? (
                <>
                  <Link className="btn btn-outline-primary" to="/login">Login</Link>
                  <Link className="btn btn-primary" to="/signup">Sign up</Link>
                </>
              ) : (
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
