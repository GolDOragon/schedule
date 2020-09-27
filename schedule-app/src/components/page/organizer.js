import React from 'react';
import { Avatar, Space } from 'antd';

const Organizer = (props) => {
  const {organizer} = props;

    return (
      <div>
        <Space><Avatar  style={{marginTop: 15}} src={organizer.face}></Avatar></Space>
        <Space><a style={{margin: 10}} href={organizer.gitLink} target="_blank" rel="noopener noreferrer">{organizer.name}</a></Space>
      </div>
  )
}

export default Organizer;