import React from 'react';
import { Link } from 'react-router-dom';
import info from '../../assets/info.json'; // adjust path if needed

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={info.navbar.logo.href} className="logo">
          {info.navbar.logo.text}
        </Link>
        <div className="nav-links">
          {info.navbar.links.map((link, index) => (
            <Link key={index} to={link.href}>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};