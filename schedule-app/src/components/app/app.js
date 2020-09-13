import React from 'react';
import Header from '../header/header';
import AddModal from '../addModal/addModal';
import Table from '../table/table';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import './app.css';

import ScheduleApiService from '../../services/scheduleApi-service'

const  App = () => {
  const [items, setItems] = React.useState([]);
  const [userType, setUserType] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  function onCreate(values) {
    ScheduleApiService.addEvent(
      values.dateTime,
      values.time,
      values.type,
      values.name,
      values.timePass,
      values.description,
      values.descriptionUrl,
      values.place,
      '', //values.timeZone
      values.comment
    )
    .then((data) => {setItems(data)})
    setVisible(false);
  };

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

  //В этой функции будет вызов всплывающего окна, в котором будет удаление. Пока что просто удаление.
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
    <div>
      <Header onUserChange={onUserChange}/>
      {userType === 'mentor' && <Button type="primary" onClick={() => {setVisible(true)}}>New Collection</Button> }
      <AddModal visible={visible} onCreate={onCreate} onCancel={() => {setVisible(false)}}/>
      <Table items={items} onEdit={onEdit} onSelect={onSelect} userType={userType}/>
    </div>
  )
}

export default App;
