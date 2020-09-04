export default class ScheduleApiService {

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
    return res.map(this._transformEvent);
  }

  async getEvent(id) {
    const event = await this.getResource(`/event/${id}`);
    return this._transformEvent(event);
  }

  async getAllOrganizers() {
    const res = await this.getResource(`/organizers`);
    return res.map(this._transwormOrganizer);
  }

  async getOrganizer(id) {
    const organizer = await this.getResource(`/organizer/${id}`);
    return this._transwormOrganizer(organizer);
  }

  _transformEvent(event) {
    return {
      id: event.id,
      name:event.name,
      type: event.type,
      descriptionUrl: event.descriptionUrl,
      description: event.description,
      place: event.place
    } 
  }

  _transwormOrganizer(organizer) {
    return {
      id: organizer.id,
      name: organizer.name
    }
  }
}


