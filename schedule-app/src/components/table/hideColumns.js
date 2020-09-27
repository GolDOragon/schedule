import React from 'react';
import {Select, Tooltip} from 'antd';
import 'antd/dist/antd.css';

function HideColumns(props) {
  const { Option } = Select;
  const children = [];
  props.types.forEach((item, i) => {
    children.push(<Option key={i} value={item}>{item}</Option>);
  });

  return (
    <div>
    <Tooltip title="Show and hide columns">
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={props.types}
          onChange={props.onHideColumn}
          >
          {children}
        </Select>
      </Tooltip>
    </div>
  )
}

export default HideColumns;
