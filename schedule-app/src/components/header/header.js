import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <div>
      <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link" to="/table">table</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/calendar">calendar</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/list">list</Link>
      </li>
      </ul>
      <select id="userType" name="userType" onChange={props.onUserChange}>
        <option value="student">Студент</option>
        <option value="mentor">Ментор</option>
      </select>
    </div>
  )
}

export default Header;
