class ScheduleApiService {

  _apiBase = 'https://rs-react-schedule.firebaseapp.com/api/team/26';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

      if(!res.ok) {
        throw new Error(`Could not fetch ${url}` +
        `,recived ${res.status}`)
      }
      return await res.json();
  }

  async getAllEvents() {
    const res = await this.getResource(`/events`);
    return res.data;
  }

  async getEvent(eventId) {
    const event = await this.getResource(`/event/${eventId}`);
    return this._transformEvent(event);
  }

  async addEvent(dateTime, time, type, name, timePass, description, descriptionUrl, place, timeZone, comment, picture, video, map, mentor) {
    const url = 'https://rs-react-schedule.firebaseapp.com/api/team/26/event';
    const body = {
      dateTime : dateTime,
      time : time,
      type : type,
      name : name,
      timePass: timePass,
      description : description,
      descriptionUrl : descriptionUrl,
      place: place,
      timeZone : `UTC${new Date().getTimezoneOffset()/60}`,
      comment: comment,
      picture: picture,
      video: video,
      map: map,
      mentor: mentor,
      showComment: 'true'
    };
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return this.getAllEvents();
  }

  async updateEvent(eventId, dateTime, time, type, name, timePass, description, descriptionUrl, place, timeZone, comment, picture, video, map, mentor){
    const url = `https://rs-react-schedule.firebaseapp.com/api/team/26/event/${eventId}`;
    const body = {
      dateTime : dateTime,
      time : time,
      type : type,
      name : name,
      timePass: timePass,
      description : description,
      descriptionUrl : descriptionUrl,
      place: place,
      timeZone : timeZone,
      comment: comment,
      picture: picture,
      video: video,
      map: map,
      mentor: mentor,
    };
    await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return this.getEvent(eventId);
  }

  async deleteEvent(eventId) {
    const url = `https://rs-react-schedule.firebaseapp.com/api/team/26/event/${eventId}`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return this.getAllEvents();
  }

  async getAllOrganizers() {
    const res = await this.getResource(`/organizers`);
    return res.data.map(this._transwormOrganizer);
  }

  async getOrganizer(organizerId) {
    const organizer = await this.getResource(`/organizer/${organizerId}`);
    return this._transwormOrganizer(organizer);
  }

  async addOrganizer(organizer) {
    const url = 'https://rs-react-schedule.firebaseapp.com/api/team/26/organizer';
    const body = {
      name : `${organizer.name}`,
      face : `${organizer.face}`,
      gitLink : `${organizer.gitLink}`,
    };
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return this.getAllOrganizers();
  }

  async updateOrganizer(organizerId, organizer){
    const url = `https://rs-react-schedule.firebaseapp.com/api/team/26/organizer/${organizerId}`;
    const body = {
      organizer: `${organizer}`
    };
    await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }

  async deleteOrganizer(organizerId) {
    const url = `https://rs-react-schedule.firebaseapp.com/api/team/26/organizer/${organizerId}`
    await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  _transformEvent(event) {
    return {
      id: event.id,
      dateTime : event.dateTime,
      time : event.time,
      name:event.name,
      timePass: event.timePass,
      type: event.type,
      descriptionUrl: event.descriptionUrl,
      description: event.description,
      place: event.place,
      timeZone : event.timeZone,
      comment: event.comment
    }
  }

  _transwormOrganizer(organizer) {
    return {
      id: organizer.id,
      name: organizer.name,
      face: organizer.face,
      gitLink: organizer.gitLink
    }
  }
}

const scheduleApiService = new ScheduleApiService();

export default scheduleApiService;
