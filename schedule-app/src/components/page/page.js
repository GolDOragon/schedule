import React, { useEffect, useState } from 'react'
import { Card, Row, Divider, Tag, Rate, Comment, Spin, Space} from 'antd';
import Feedback from './feedback';
import Organizer from './organizer';
import ScheduleApiService from '../../services/scheduleApi-service';
import './page.css';
import { EditOutlined} from '@ant-design/icons';
import EditedPage from './editedPage';

import YandexMap from './map';

const Page = (props) => {
  const { onSelect} = props;
  const str = window.location.href;
  const eventId = str.substr(str.lastIndexOf('?') + 1);
  const [onEdit, setOnEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('');
  const [row, setRow] = useState({});
  const [organizer, setOrganizer] = useState({});

  function onUpdateEvent(eventId, values) {
    
    ScheduleApiService.updateEvent(eventId,
      values.dateTime,
      values.time ,
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
      
    )
    .then((data) => {
      console.log(data);
      let currentEvent = '';
      data.forEach((item, i) => {
        if (item.id === eventId) currentEvent = item;
      });
      currentEvent.dateTime = currentEvent.dateTime.format('YYYY-MM-DD');
      currentEvent.time = currentEvent.time.format('HH:mm');
      setRow(currentEvent);
      setOnEdit(false);
      setLoading(false);
    })
  };

  useEffect(() => {
    let cancelled = false;
    ScheduleApiService.getEvent(eventId)
      .then((data) => {
        setRow(data);
        console.log(data)
        setLoading(false);
        return data;
      })
      .then(data => {
        if(data.mentor!=='' && data.mentor!==undefined) {
          ScheduleApiService.getOrganizer(data.mentor)
          .then((res) => {
            !cancelled && setOrganizer(res);
          })
        }
        if(data.map!==undefined){
          ScheduleApiService.getCoordinates(data.map) 
          .then((res) => {
            return res;
          })
        }
      })
    switch(row.type) {
      case 'Deadline': setColor('red'); break;
      case 'Self education': setColor(''); break;
      case 'Task': setColor('green'); break;
      case 'Test': setColor('blue'); break;
      case 'Lecture': setColor('purple'); break;
      case 'Screening': setColor(''); break;
      case 'Meetup': setColor('magenta'); break;
      default:setColor('');
    }
    return () => cancelled = true;
  }, [eventId, row.type]);


  const { dateTime, time, type, name, timePass, description, descriptionUrl, place, comment, mentor, showComment, map} = row;

    return (
      loading ?
        <Row ><Spin className='loading' tip="Loading..."></Spin></Row> :
 
        <Row>
        {onEdit===false ?
        <Card
          className='card'
          title={name}
          actions={
            props.userType === 'mentor' &&
            [<EditOutlined key="edit" onClick={() => setOnEdit(true)}/>]
          }>

          <Tag color={color}>{type}</Tag>
          <Space><span>{dateTime}</span>
            <span>{time}</span>
            <span>{timePass}h</span>
          </Space>
          {/* <span><Rate allowHalf defaultValue={2.5} /></span> */}
          {mentor &&
          <Organizer organizer={organizer}/>
          }

          {description && <Divider orientation="left">Описание:</Divider>}
          {description &&
            <p>{description}</p>
          }
          {descriptionUrl && <Divider orientation="left">Ссылка на тз:</Divider>}
          {descriptionUrl &&
          <a href={descriptionUrl}>Ссылка на ТЗ</a>
          }
          <br />
          {type==='Lecture' &&
          <Row>
            <iframe title="видео"  src="https://youtube.com/embed/0M9Rz-wXYas" width="480" height="360" allowFullScreen></iframe>
          </Row>
          }
          {place && <Divider  orientation="left">Место проведения:</Divider>}
          {place &&
            <p>{place}</p>
            
          }  
          {map && 
          <p>{map}</p>}
          {type==='Meetup' &&
            <Row>
              <YandexMap map={map}/>
            </Row>
          }

          {(showComment==='true') &&
            <Feedback comment={comment} /> 
          }
           
          
        </Card> : 
        <EditedPage row={row} eventId={eventId} onUpdateEvent={onUpdateEvent} organizer={organizer} organizers={props.organizers}  onSelect={onSelect}/>
        }  
      </Row>
    )
}

export default Page;
