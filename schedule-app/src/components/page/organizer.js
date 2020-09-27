import React from 'react';
import { Avatar } from 'antd';

const Organizer = (props) => {
  const {organizer} = props;

    return (
      <div>
        <Avatar  style={{marginTop: 15}} src={organizer.face}></Avatar>
        <a href={organizer.gitLink} target="_blank" rel="noopener noreferrer">{organizer.name}</a>
      </div>
  )
}

export default Organizer;