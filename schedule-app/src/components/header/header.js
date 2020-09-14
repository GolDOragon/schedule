import React from 'react';
import {Select} from 'antd';
import 'antd/dist/antd.css';
import './header.css';

function Header(props) {
  const { Option } = Select;
  return (
    //<select id="userType" name="userType" onChange={props.onUserChange}>
    //  <option value="student">Студент</option>
    //  <option value="mentor">Ментор</option>
    //</select>

    <Select defaultValue="mentor" name="userType" style={{ width: 120 }} onChange={props.onUserChange}>
      <Option value="student">Студент</Option>
      <Option value="mentor">Ментор</Option>
    </Select>
  )
}

export default Header;
