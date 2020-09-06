import React, { Component } from 'react';
import ScheduleApiService from '../../services/scheduleApi-service';

export default class List extends Component {

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



    render() {

        const  { event: { name, type, descriptionUrl, description, place},
        }= this.state;
        return (
            <div>

            </div>
        )
    }
}