import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import custom CSS

const Navbar = () => {
  return (
    <div className="navigation">
      <input type="checkbox" className="navigation__checkbox" id="navi-toggle" />

      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/" className="navigation__link">
              <span>01</span>Home
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/login" className="navigation__link">
              <span>02</span>Login
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/signup" className="navigation__link">
              <span>03</span>Signup
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
