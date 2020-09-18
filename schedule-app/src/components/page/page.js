import React, { useState } from 'react'
import { Card, Tag, Divider, Rate, Row} from 'antd';
import Feedback from './feedback';
import SimpleMap from './map';
import ScheduleApiService from '../../services/scheduleApi-service';
import './page.css';
import { EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import Organizer from './organizer';
import EditedPage from './editedPage';

const Page = (props)=> {

  const [color, setColor] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const [row, setRow] = useState('');
  const str = window.location.href;
  const eventId = str.substr(str.lastIndexOf('?') + 1);
  console.log(eventId)

  React.useEffect(() => {
    ScheduleApiService.getEvent(eventId)
    .then((data) => {
      console.log(data);
      setRow(data)});
    switch(row.type) {
      case 'Deadline': {setColor('red')} break;
      case 'Self education': {setColor('')} break;
      case 'Task': {setColor('green')} break;
      case 'Test': {setColor('blue')} break;
      case 'Lecture': {setColor('purple')} break;
      case 'Screening': {setColor('')} break;
      case 'Meetup': {setColor('magenta')} break;
      default:setColor('');
    }
  },[eventId, row.type])

    const {dateTime, time, type, name, timePass, description, descriptionUrl, place, comment, mentor} = row;
    return (
      <Row>
      {onEdit===false ?
        <Card
          className="card m-auto"
          title={name}

          actions={
            props.userType === 'mentor' &&
            [<SettingOutlined key="setting" />,
            <EditOutlined key="edit" onClick={() => {setOnEdit(true)}}/>,
            <EllipsisOutlined key="ellipsis" />,]
          }>

          <Tag color={color}>{type}</Tag>
          <span>{dateTime}</span>
          <span className="p-2">{time}</span>
          <span className="p-2 pr-5">{timePass}</span>
          <span className="float-right"><Rate allowHalf defaultValue={2.5} /></span>
          {mentor &&
          <Organizer organizerId={mentor}/>
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
          <Feedback comment={comment}/>
        </Card> : <EditedPage event={row}/>
      } 
        
        
      </Row>

    )
}

export default Page;
