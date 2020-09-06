import React, { Component } from 'react';
import ScheduleApiService from '../../services/scheduleApi-service';

export default class Table extends Component {
  
  scheduleApiService = new ScheduleApiService();
  
  state = {
    event: {}
  };

  constructor() {
    super();
    this.updateEvent();
  }

  onEventLoaded = (event) => {
    this.setState({event});
  };

  onOrganizerLoaded = (organizer) => {
    this.setState({organizer: {
      name: organizer.name
    }});
  }

  updateEvent() {
    const id = 'nbG5bWM8NqUY9UOj6rWW';
    this.scheduleApiService
      .getEvent(id)
      .then(this.onEventLoaded);
  }

  updateOrganizer = () => {
    const id = 'H1DP9yWIwO5CTKBPLllD';
    this.scheduleApiService
      .getOrganizer(id)
      // .then(this.onOrganizerLoaded)
      .then((organizer) => {
        console.log(organizer.name)
        // return organizer.name;
      })
      
  }
  add = () => {
    this.scheduleApiService
      .addEvent({
        event: {
          name: 'testWithoutData', 
          timePass: '16h', 
        }
      })
  }
  deleteEvent = () =>{
    this.scheduleApiService
      .deleteEvent('yUMFUXCclbHtcmXclBYQ')
  }
 
  getEvents = () => {
    this.scheduleApiService
      .getAllEvents()
  }
  

  render() {

    const  { event: { name, type, descriptionUrl, description, place}
             }= this.state;
    return (
      <div>
        <ul className="list-group mb-5">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{type}</li>
          <li className="list-group-item">{descriptionUrl}</li>
          <li className="list-group-item">{description}</li>
          <li className="list-group-item">{place}1</li>
          <li className="list-group-item">{this.updateOrganizer()}</li>
          <button>{this.getEvents()}</button>
        </ul>
        <ul className="list-group ">
          <li className="list-group-item">1</li>
          <li className="list-group-item">2</li>
          <li className="list-group-item">3</li>
          <li className="list-group-item">4</li>
          <li className="list-group-item">5</li>
        </ul>
      </div>
    )
  }
}