import React  from 'react';
import './app.css';
import  { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../header/header';
import AddModal from '../addModal/addModal';
import AddMentorModal from '../addMentorModal/addMentorModal';
import AntTable from '../table/table';
import Card from '../card/card';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import ScheduleApiService from '../../services/scheduleApi-service'


const  App = () => {
  const [items, setItems] = React.useState([]);
  const [userType, setUserType] = React.useState('mentor');
  const [visible, setVisible] = React.useState(false);
  const [visibleM, setVisibleM] = React.useState(false);
  const [organizers, setOrganaizers] = React.useState([]);

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
      values.mentor
    )
    .then((data) => {
       data.map((item) => {return item.key = item.id})
       return data;
    })
    .then((data) => {setItems(data)})
    setVisible(false);
  };

  function onMentorCreate(values) {
    ScheduleApiService.addOrganizer(values)
    .then((data) => {setOrganaizers(data)})
    setVisibleM(false);
  }

  // сетаем в стейт показывать ли описание таски
  const [viewTaskDescript, setViewTaskDesc] = React.useState(false);
  // сетаем в стейт ID какой таски показывать
  const [viewTaskId, setViewTaskId] = React.useState(1);


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
    )
  }

  function onSelect(row) {
    setViewTaskDesc(true);
    setViewTaskId(row.id);
  }

   function onCloseDescription() {
    setViewTaskDesc(false)
  }

  function onSaveDescription() {
    alert ("еще не реализованно")
  }

  function onDeleteDescription() {
    const deleteRow = window.confirm ("Удалить запись?");
    if (deleteRow) {
        ScheduleApiService.deleteEvent(viewTaskId)
            .then((data) => {setItems(data)})
    }
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
      { viewTaskDescript===true
            ?  <Card items={items} viewId={viewTaskId}
               onCloseDescription={onCloseDescription}
               onSaveDescription={onSaveDescription}
               onDeleteDescription={onDeleteDescription}
               />
            :  <div></div> }
        <header>
          <Header onUserChange={onUserChange}/>
          {userType === 'mentor' && <Button type="primary" onClick={() => {setVisible(true)}}>Добавить событие</Button> }
          {userType === 'mentor' && <Button className="secondBtn" type="primary" onClick={() => {setVisibleM(true)}}>Добавить ментора</Button> }
        </header>
        <AddModal visible={visible} onCreate={onCreate} organizers={organizers} onCancel={() => {setVisible(false)}}/>
        <AddMentorModal visible={visibleM} onCreate={onMentorCreate} onCancel={() => {setVisibleM(false)}}/>
        <Route path="/table">
          <AntTable items={items} onEdit={onEdit} onSelect={onSelect} userType={userType} organizers={organizers}/>
        </Route>
        <Route path="/calendar" render={() => <h2>Calendar</h2>}></Route>
        <Route path="/list" render={() => <h2>List</h2>}></Route>
      </div>
    </Router>
  )
}

export default App;
