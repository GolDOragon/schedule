import React  from 'react';
import './app.css';
import  { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../header/header';
import Table from '../table/table';
import ScheduleApiService from '../../services/scheduleApi-service'

const  App = () => {
  const [items, setItems] = React.useState([]);
  const [userType, setUserType] = React.useState([]);

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
      row.comment
    )
  }

  function onAdd(row) {
    ScheduleApiService.addEvent('', '', '', ' Ввод нового события...', '', '', '', '', '',  '', '')
    .then((data) => {setItems(data)})
  }

  function onSelect(row) {
    const deleteRow = window.confirm ("Удалить запись?");
    if (deleteRow) {
      ScheduleApiService.deleteEvent(row.id)
      .then((data) => {setItems(data)})
    }
  }

  function onUserChange(user) {
    setUserType(user.target.value);
  }

  React.useEffect(() => {
    ScheduleApiService.getAllEvents()
    .then((data) => {setItems(data)});
  }, [])

  return (
    <Router>
      <div>
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
