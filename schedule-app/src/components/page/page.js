import React, { useState } from 'react'
import { Card, Input, Tag, Divider, Rate, Space, Row, Col } from 'antd';
import Feedback from './feedback';
import SimpleMap from './map';
import './page.css';
import { EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import Organizer from './organizer';

const { TextArea } = Input;
const { Meta } = Card;

const Page = (props)=> {

  const [color, setColor] = useState('');
  const [display, setDisplay] = useState('block');

    React.useEffect(() => {
      if (props.event.type === 'Deadline') {setColor('red')}
      if (props.event.type === 'Self education') {setColor('')}
      if (props.event.type === 'Task') {setColor('green')}
      if (props.event.type === 'Test') {setColor('blue')}
      if (props.event.type === 'Lecture') {setColor('orange')}
      if (props.event.type === 'Screening') {setColor('purple')}
    },[]) 
    
    const { event: {dateTime, time, type, name, timePass, description, descriptionUrl, place, comment, mentor}} = props;
    return (
      <Row>
        <Card
          className="card m-auto" 
          title={name}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined 
              key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}>
          
          <Tag color={color}>{type}</Tag> 
          <span>{dateTime}</span>
          <span className="p-2">{time}</span>
          <span className="float-right"><Rate allowHalf defaultValue={2.5} /></span>
          <Organizer organizerId={mentor}/>
          <Divider orientation="left">Описание:</Divider>
          {description.length!==0 &&
            <p>{description}</p>
          }
          {descriptionUrl.length!==0 &&
          <a href={descriptionUrl} display={display}>Ссылка на ТЗ</a>
          }
          <br />  
          {type==='Lecture' && 
          <Row className="m-3">
            <iframe className="m-auto"  src="https://youtube.com/embed/0M9Rz-wXYas" width="480" height="360" allowFullScreen></iframe>
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
        </Card>
      </Row>
      
    )  
}

export default Page;