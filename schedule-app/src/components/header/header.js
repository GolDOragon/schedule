import React from 'react';
import {Select} from 'antd';
import 'antd/dist/antd.css';
import './header.css';
import { Link } from 'react-router-dom';

function Header(props) {
  const { Option } = Select;
  return (
    <div>
      <ul className="nav">
      <li className="nav-item">
        <Select defaultValue="mentor" name="userType" style={{ width: 120 }} onChange={props.onUserChange}>
          <Option value="student">Студент</Option>
          <Option value="mentor">Ментор</Option>
        </Select>
      </li>
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
    </div>
  )
}

export default Header;
