import React from 'react';
import './header.css';

function Header(props) {
  return (
    <select id="userType" name="userType" onChange={props.onUserChange}>
      <option value="student">Студент</option>
      <option value="mentor">Ментор</option>
    </select>
  )
}

export default Header;
