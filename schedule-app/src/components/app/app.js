import React  from 'react';
import './app.css';
import ListRS from '../listRS/listRS';
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

  function onCreate(values) {
    ScheduleApiService.addEvent(
      values.dateTime && values.dateTime.format('YYYY-MM-DD'),
      values.time && values.time.format(),
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
      values.dateTime && values.dateTime.format('YYYY-MM-DD'),
      values.time && values.time.format(),
      values.type,
      values.name,
      values.timePass && `${values.timePass}`,
      values.description,
      values.descriptionUrl,
      values.place,
      '', 
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
  };

  function onMentorCreate(values) {
    ScheduleApiService.addOrganizer(values)
    .then((data) => {setOrganaizers(data)})
    setVisibleM(false);
  }

  function onSelect(row) {
    const url = `/page?${row.id}`;
    setRedirect(url);
  }

  function onUserChange(user) {
    setUserType(user);
  }
  
  function onDeleteEvent(eventId) {
    ScheduleApiService.deleteEvent(eventId)
    .then((data) => {
       data.map((item) => {return item.key = item.id})
       return data;
    })
    .then((data) => {setItems(data)});
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
          {userType === 'mentor' && <Button type="primary" onClick={() => {setVisible(true)}}>Create event</Button> }
          {userType === 'mentor' && <Button className="secondBtn" type="primary" onClick={() => {setVisibleM(true)}}>Create mentor</Button> }
        </header>
        <AddEventModal visible={visible} onCreate={onCreate} organizers={organizers} onCancel={() => {setVisible(false)}}/>
        <AddMentorModal visible={visibleM} onCreate={onMentorCreate} onCancel={() => {setVisibleM(false)}}/>
        <Route path="/" exact>
          <AntTable items={items} onUpdateEvent={onUpdateEvent} onSelect={onSelect} userType={userType} organizers={organizers} onDeleteEvent={onDeleteEvent}/>
        </Route>
        <Route path="/calendar">
          <EventCalendar items={items}/>
        </Route>
        <Route path="/list">
            <ListRS items={items}/>
        </Route>
        <Route path="/page">
          <Page items={items} userType={userType} onUpdateEvent={onUpdateEvent} organizers={organizers}/>
        </Route>
      </div>
    </Router>
  )
}

export default App;
