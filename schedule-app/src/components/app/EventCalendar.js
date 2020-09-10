import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import './App.css';

export function EventCalendar() {
  return (
    <div className="App">
      <FullCalendar
        // timeZone = "local"
        buttonIcons = "true"
        height = "auto"
        navLinks = "true"
        editable = "true"
        dayMaxEvents = "true"
        headerToolbar={{
          left: "prev,today,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        locale="ru"
        plugins={[dayGridPlugin, timeGridPlugin]}
      />
    </div>
  );
}
