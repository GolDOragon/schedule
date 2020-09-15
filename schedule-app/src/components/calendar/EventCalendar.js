import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import Demo from './prelouder';
import {Array, List} from './event';
import Pdf from "react-to-pdf"
import './App.css';

const ref = React.createRef();

export function EventCalendar(props) {
  if (props.items.length !== 0){
  Array(props);

  return (
    <div className="App" ref={ref}>
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
      <Pdf targetRef={ref} filename="file.pdf" x={5} y={5} scale={.5}>
         {({ toPdf }) => <a href="/#" className="bott" onClick={toPdf}>Save</a>}
      </Pdf>
    </div>
  );
}
  return (
    <Demo />
  );
}
