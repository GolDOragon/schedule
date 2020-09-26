import React from 'react';
import {Select} from 'antd';
import 'antd/dist/antd.css';

function HideColumns(props) {
  const { Option } = Select;
  const children = [];
  props.types.forEach((item, i) => {
    children.push(<Option key={i} value={item}>{item}</Option>);
  });

  return (
    <div>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={props.types}
          onChange={props.onHideColumn}
          >
          {children}
        </Select>
    </div>
  )
}

export default HideColumns;
