export default class ScheduleApiService {

  _apiBase = 'https://rs-react-schedule.firebaseapp.com/api/team/26';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

      if(!res.ok) {
        throw new Error(`Could not fetch ${url}` + `,recived ${res.status}`)
      }
      return await res.json();
  }

  async getAllEvents() {
    const res = await this.getResource(`/events`);
    return res.data;
  }

  getEvent(id) {
    return this.getResource(`/event/${id}`);
  }

  async getAllOrganizers() {
    const res = await this.getResource(`/organizers`);
    return res.data;
  }

  getOrganizer(id) {
    return this.getResource(`/organizer/${id}`);
  }

}


