import React, {Component} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './App.css';

export class EventCalendar extends Component{

  render(){
    return(
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={[
          { title: 'event 1', date: '2020-09-20' },
          { title: 'eaaaa', date: '2020-09-21' }
        ]}
      />
    )
  };

}
