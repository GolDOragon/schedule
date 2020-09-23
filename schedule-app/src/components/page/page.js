import React, { useState } from 'react'
import { Card, Row, Form, Divider, Tag, Rate} from 'antd';
import Feedback from './feedback';
import SimpleMap from './map';
import Organizer from './organizer';
import ScheduleApiService from '../../services/scheduleApi-service';
import './page.css';
import { EditOutlined} from '@ant-design/icons';
import EditedPage from './editedPage';

const Page = (props) => {
  const {onUpdateEvent} = props;
  const str = window.location.href;
  const eventId = str.substr(str.lastIndexOf('?') + 1);
  const [onEdit, setOnEdit] = useState(false);
  const [color, setColor] = useState('');
  const [form] = Form.useForm();
  const [row, setRow] = useState({});
  const [organizer, setOrganizer] = useState({});


  React.useEffect(() => {
    ScheduleApiService.getEvent(eventId)
    .then((data) => {
      console.log(data)
      return data;
    })
    .then(data => {
      if(data.mentor!=='' && data.mentor!==undefined) {
        ScheduleApiService.getOrganizer(data.mentor)
        .then((res) => {
          setOrganizer(res);
        })
      }
      setRow(data);
     
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
  }, [eventId, form, row.type]);
  const {dateTime, time, type, name, timePass, description, descriptionUrl, place, comment, mentor, showComment} = row;

  const changeView = () => {
    onEdit===false ? setOnEdit(true) : setOnEdit(false)
  }

    return (
      <Row>
      {onEdit===false ?
        <Card
          className="card m-auto"
          title={name}
          actions={
            props.userType === 'mentor' &&
            [<EditOutlined key="edit" onClick={() => changeView()}/>]
          }>

          <Tag color={color}>{type}</Tag>
          <span>{dateTime}</span>
          <span className="p-2">{time}</span>
          <span className="p-2 pr-5">{timePass}</span>
          <span className="float-right"><Rate allowHalf defaultValue={2.5} /></span>
          {mentor &&
          <Organizer organizer={organizer}/>
          }

          <Divider orientation="left">Описание:</Divider>
          {description &&
            <p>{description}</p>
          }
          {descriptionUrl &&
          <a href={descriptionUrl}>Ссылка на ТЗ</a>
          }
          <br />
          {type==='Lecture' &&
          <Row className="m-3">
            <iframe title="видео" className="m-auto"  src="https://youtube.com/embed/0M9Rz-wXYas" width="480" height="360" allowFullScreen></iframe>
          </Row>
          }
          <Divider  orientation="left">Место проведения:</Divider>
          <p>{place}</p>
          <Row className="m-3">
            <div className="m-auto" style={{width: '480px', height: '360px'}}>
              <SimpleMap/>
            </div>
          </Row>

          <p>{comment}</p>
          {showComment==='true' &&
            <Feedback comment={comment} />
          }
          
        </Card> : 
        <EditedPage event={row} eventId={eventId} onUpdateEvent={onUpdateEvent} organizer={organizer} organizers={props.organizers} changeView={changeView}/>
        }  
      </Row>
    )
}

export default Page;
