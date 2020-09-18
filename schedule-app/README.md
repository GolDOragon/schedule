import scheduleApiService from '../../services/scheduleApi-service'; // add in your component


event: {
    id:  string // id события
    name: string // название события
    description: string //описание события
    descriptionUrl: string //ссылки на событие
    type: string //тип события(выдача таска, дедлайн, лекция, митап, тест, ...)
    timeZone: string // UTC
    dateTime: string // дата события (2020-07-27)
    place: string //online/офлайн место
    comment: string // комментарии(опционально для ментора)
    timePass: string //время,необходимое для изучения/выполнения события
    time: string // время начала события/либо время дедлайна
}

organizer: {
    id: string,
    name: string //имя организатора
}

*getAllEvents() 
*getEvent(eventId)
*addEvent(dateTime, time, type, name, timePass, description, descriptionUrl, place, timeZone, comment)
*updateEvent(eventId, dateTime, time, type, name, timePass, description, descriptionUrl, place, timeZone, comment)
*deketeEvent(eventId)

*getAllOrganizers()
*getOrganizer(organizerId)
*addOrganizer(organizer) // organizer name
*updateOrganizer(organizerId, organizer)
*deleteOrganizer(organizerId)

for example
scheduleApiService.getAllEvents() 

