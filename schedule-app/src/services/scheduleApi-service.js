import moment from 'moment';

class ScheduleApiService {

  _apiBase = 'https://rs-react-schedule.firebaseapp.com/api/team/26';

  async getCoordinates(map) {
    const res = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=414ea024-2f29-4bce-996e-cae0435d160c&geocode=${map}`)
    return res;
  }
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
    res.data.forEach((item, i) => {
      item.dateTime = moment(item.dateTime);
      item.time = moment(item.time);
    });
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
      showComment: true
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

  async updateEvent(eventId, dateTime, time, type, name, timePass, description, descriptionUrl, place, timeZone, comment, picture, video, map, mentor, showComment){
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
      showComment: showComment
    };
    await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return this.getAllEvents();
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
      // dateTime: event.dateTime,
      // time: event.time,
      dateTime : new Date(event.dateTime).getFullYear() + '-' + ("0" + new Date(event.dateTime).getMonth()).slice(-2) + '-' + ("0" + new Date(event.dateTime).getDate()).slice(-2),
      time: ("0" + new Date(event.time).getHours()).slice(-2)   + ":" + ("0" + new Date(event.time).getMinutes()).slice(-2),
      name:event.name,
      timePass: event.timePass,
      type: event.type,
      descriptionUrl: event.descriptionUrl,
      description: event.description,
      place: event.place,
      timeZone : event.timeZone,
      comment: event.comment,
      picture: event.picture,
      video: event.video,
      map: event.map,
      mentor: event.mentor,
      showComment: 'true',
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
