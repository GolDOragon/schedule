import React  from 'react';
import './app.css';
import Table from '../table/table';
import ScheduleApiService from '../../services/scheduleApi-service'

const  App = () => {
  const [items, setItems] = React.useState([]);
  
  function onEdit(newValue, row) {
    console.log(row)
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
  
  function onSelect(row) {
    alert(`Здесь будет карточка для таска: ${row.name}`)
  }
  
  React.useEffect(() => {
    ScheduleApiService.getAllEvents()
    .then((data) => {
      setItems(data)
    });
  }, [])
  
  return (
    <div>
      <Table items={items} onEdit={onEdit} onSelect={onSelect} />
    </div>
  ) 
}

export default App;