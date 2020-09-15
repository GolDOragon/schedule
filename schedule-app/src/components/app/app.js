import React from 'react';
import Header from '../header/header';
import AddModal from '../addModal/addModal';
import AntTable from '../table/table';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import './app.css';

import ScheduleApiService from '../../services/scheduleApi-service'

const  App = () => {
  const [items, setItems] = React.useState([]);
  const [userType, setUserType] = React.useState('mentor');
  const [visible, setVisible] = React.useState(false);


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
      values.comment
    )
    .then((data) => {
       data.map((item) => {return item.key = item.id})
       return data;
    })
    .then((data) => {setItems(data)})
    setVisible(false);
  };

  function onEdit(newValue, row) {
    console.log(row);
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
    console.log(row)
    const deleteRow = window.confirm ("Удалить запись?");
    if (deleteRow) {
      ScheduleApiService.deleteEvent(row.id)
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
  }, [])

  return (
    <div className="wrapper">
      <header>
        <Header onUserChange={onUserChange}/>
        {userType === 'mentor' && <Button type="primary" onClick={() => {setVisible(true)}}>Добавить событие</Button> }
      </header>
      <AddModal visible={visible} onCreate={onCreate} onCancel={() => {setVisible(false)}}/>
      <AntTable items={items} onEdit={onEdit} onSelect={onSelect} userType={userType}/>
    </div>
  )
}

export default App;
