import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import Demo from './prelouder';
import {Array, List} from './event';
import './App.css';

export function EventCalendar(props) {
  if (props.items.length !== 0){
  Array(props);

  return (
    <div className="App">
      <FullCalendar
        // timeZone = "local"
        displayEventTime = "true"
        buttonIcons = "true"
        height = "auto"
        navLinks = "true"
        editable = "true"
        dayMaxEvents = "true"
        nowIndicator = "true"
        locale="ru"
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,today,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        eventTimeFormat = {{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }}
        slotLabelFormat = {{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
        }}
        events = {List}
      />
    </div>
  );
}
  return (
    <Demo />
  );
}
