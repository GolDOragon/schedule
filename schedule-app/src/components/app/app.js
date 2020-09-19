import React  from 'react';
import './app.css';
import  { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from '../header/header';
import AddEventModal from '../addEventModal/addEventModal';
import AddMentorModal from '../addMentorModal/addMentorModal';
import AntTable from '../table/table';
import {EventCalendar} from '../calendar/EventCalendar'
import {Button} from 'antd';
import 'antd/dist/antd.css';
import ScheduleApiService from '../../services/scheduleApi-service';
import Page from '../page/page';


const  App = () => {
  const [items, setItems] = React.useState([]);
  const [userType, setUserType] = React.useState('mentor');
  const [visible, setVisible] = React.useState(false);
  const [visibleM, setVisibleM] = React.useState(false);
  const [organizers, setOrganaizers] = React.useState([]);
  const [redirect, setRedirect] = React.useState('/');
  const [eventId, setEventId] = React.useState('');

  function onCreate(values) {
    ScheduleApiService.addEvent(
      values.dateTime ? values.dateTime.format('YYYY-MM-DD') : '',
      values.time ? values.time.format('HH:mm') : '',
      values.type,
      values.name,
      values.timePass,
      values.description,
      values.descriptionUrl,
      values.place,
      '', //values.timeZone
      values.comment,
      values.picture,
      values.video,
      values.map,
      values.mentor,
      values.showComment
    )
    .then((data) => {
       data.map((item) => {return item.key = item.id})
       return data;
    })
    .then((data) => {setItems(data)})
    setVisible(false);
  };

  function onUpdateEvent(eventId, values) {
    ScheduleApiService.updateEvent(eventId,
      values.dateTime ? values.dateTime.format('YYYY-MM-DD') : '',
      values.time ? values.time.format('HH:mm') : '',
      values.type,
      values.name,
      values.timePass ? `${values.timePass}h` : '',
      values.description,
      values.descriptionUrl,
      values.place,
      '', //values.timeZone
      values.comment,
      values.picture,
      values.video,
      values.map,
      values.mentor,
      // values.showComment
    )
    .then((data) => {
      data.map((item) => {return item.key = item.id})
      return data;
    })
    .then((data) => {setItems(data)})
  };

  function onMentorCreate(values) {
    ScheduleApiService.addOrganizer(values)
    .then((data) => {setOrganaizers(data)})
    setVisibleM(false);
  }

  function onEdit(newValue, row) {
    ScheduleApiService.updateEvent(
      row.id,
      row.dateTime,
      row.time,
      row.type,
      row.name,
      row.timePass,
      row.description,
      row.descriptionUrl,
      row.place,
      row.timeZone,
      row.comment,
      row.picture,
      row.video,
      row.map,
      row.mentor,
      row.showComment
    )
  }

  function onSelect(row) {
    const url = `/page?${row.id}`;
    setRedirect(url);
    setEventId(row.id);
  }

  function onUserChange(user) {
    setUserType(user);
  }

  React.useEffect(() => {
    ScheduleApiService.getAllEvents()
    .then((data) => {
       data.map((item) => {return item.key = item.id})
       return data;
    })
    .then((data) => {setItems(data)});
  }, []);

  React.useEffect(() => {
    ScheduleApiService.getAllOrganizers()
    .then((data) => {
       data.map((item) => {return item.key = item.id})
       return data;
    })
    .then((data) => {setOrganaizers(data)});
  }, []);

  return (
    <Router>
      <div>
        {redirect !== '/' && <Redirect to={redirect} />}
        <header>
          <Header onUserChange={onUserChange}/>
          {userType === 'mentor' && <Button type="primary" onClick={() => {setVisible(true)}}>Добавить событие</Button> }
          {userType === 'mentor' && <Button className="secondBtn" type="primary" onClick={() => {setVisibleM(true)}}>Добавить ментора</Button> }
        </header>
        <AddEventModal visible={visible} onCreate={onCreate} organizers={organizers} onCancel={() => {setVisible(false)}}/>
        <AddMentorModal visible={visibleM} onCreate={onMentorCreate} onCancel={() => {setVisibleM(false)}}/>
        <Route path="/" exact>
          <AntTable items={items} onEdit={onEdit} onSelect={onSelect} userType={userType} organizers={organizers}/>
        </Route>
        <Route path="/calendar">
          <EventCalendar items={items}/>
        </Route>
        <Route path="/list" render={() => <h2>List</h2>}></Route>
        <Route path="/page">
          <Page items={items} userType={userType} onUpdateEvent={onUpdateEvent} />
        </Route>
      </div>
    </Router>
  )
}

export default App;
