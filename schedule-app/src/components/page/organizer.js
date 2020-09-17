import React, { useState } from 'react';
import ScheduleApiService from '../../services/scheduleApi-service';
import { Avatar } from 'antd';

const Organizer = (props) => {
  const {organizerId} = props;
  const [organizer, setOrganizer] = useState('');

  React.useEffect(() => {
    ScheduleApiService.getOrganizer(organizerId)
    .then((data) => {
      console.log(data)
      setOrganizer(data)});
  }, []);

    return (
      <div>
        <Avatar  className="m-3" src={organizer.face}></Avatar>
        <a href={organizer.gitLink} target="_blank" rel="noopener noreferrer">{organizer.name}</a>
      </div>
  )
}

export default Organizer;