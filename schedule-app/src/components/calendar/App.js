import React from 'react'
import ScheduleApiService from '../../services/scheduleApi-service'
import {EventCalendar} from './EventCalendar'

const  AppCalendar = () => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    ScheduleApiService.getAllEvents()
    .then((data) => {
      setItems(data);
    });
  }, [])

  return (
    <div>
      <EventCalendar items={items}/>
    </div>
  )
}

export default AppCalendar;
