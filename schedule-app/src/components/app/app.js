import React  from 'react';
import './app.css';
import  { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../header/header';
import Table from '../table/table';
import Card from '../card/card';
import ScheduleApiService from '../../services/scheduleApi-service'


const  App = () => {
  const [items, setItems] = React.useState([]);
  const [userType, setUserType] = React.useState([]);

  // сетаем в стейт показывать ли описание таски
  const [viewTaskDescript, setViewTaskDesc] = React.useState(false);
  // сетаем в стейт ID какой таски показывать
  const [viewTaskId, setViewTaskId] = React.useState(1);


  function onEdit(newValue, row) {
    console.log(newValue, row)
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
      row.comment
    )
  }

  function onAdd(row) {
    ScheduleApiService.addEvent('', '', '', ' Ввод нового события...', '', '', '', '', '',  '', '')
    .then((data) => {setItems(data)})
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
    setUserType(user.target.value);
  }

  React.useEffect(() => {
    ScheduleApiService.getAllEvents()
    .then((data) => {setItems(data)});
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
        <Header onUserChange={onUserChange}/>
        <Route path="/table">
          <Table items={items} onEdit={onEdit} onSelect={onSelect} onAdd={onAdd} userType={userType}/>
        </Route>  
        <Route path="/calendar" render={() => <h2>Calendar</h2>}></Route>
        <Route path="/list" render={() => <h2>List</h2>}></Route>
      </div>
    </Router>
  )
}

export default App;
