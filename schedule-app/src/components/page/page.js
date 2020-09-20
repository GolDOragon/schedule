import React, { useState } from 'react'
import { Card, Row, Form, Input, Select} from 'antd';
import moment from 'moment';

import ScheduleApiService from '../../services/scheduleApi-service';
import './page.css';
import { EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import EditedPage from './editedPage';

const Page = (props) => {
  const {onUpdateEvent, userType} = props;
  // const {onUpdateEvent, userType} = props;
  const timeFormat = 'HH:mm';
  const dateFormat = 'YYYY-MM-DD';
  const str = window.location.href;
  const eventId = str.substr(str.lastIndexOf('?') + 1);
  const [] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  
  const [form] = Form.useForm();
  const [row, setRow] = useState({})

  // const onChange = () => {
  //   showComment === 'true' ? setAllowComment('false') : setAllowComment('true');
  // }
  React.useEffect(() => {
    ScheduleApiService.getEvent(eventId)
    .then((data) => {
      console.log(data)
      return data;
    })
    .then(data => {
      setRow(data);
    })
    .then(() => form.resetFields())
  }, [eventId, form]);
  //const {dateTime, time, type, name, timePass, description, descriptionUrl, place, comment, mentor, showComment} = row;
  //   switch(row.type) {
  //     case 'Deadline': setColor('red'); break;
  //     case 'Self education': setColor(''); break;
  //     case 'Task': setColor('green'); break;
  //     case 'Test': setColor('blue'); break;
  //     case 'Lecture': setColor('purple'); break;
  //     case 'Screening': setColor(''); break;
  //     case 'Meetup': setColor('magenta'); break;
  //     default:setColor('');
  //   }
  // },[])


    // const [allowComment, setAllowComment] = useState(showComment);
    const [style, setStyle] = useState('user-view');
    const [fields, setFields] = useState('')
    React.useEffect(() => {
      userType==='mentor' ? setStyle('mentor-view'): setStyle('user-view')
      console.log(style);
    }, [userType])

    return (
      <Row>
      {onEdit===false ?
        <Card
          className="card m-auto"
          title={row.name}

          actions={
            props.userType === 'mentor' &&
            [<SettingOutlined key="setting" />,
            <EditOutlined key="edit" onClick={() => {setOnEdit(true)}}/>,
            <EllipsisOutlined key="ellipsis" />,]
          }>
      
          <Form
          form={form}
          className="m-auto" 
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
         
          initialValues={{ 
            
            // dateTime: moment(`${dateTime}`,dateFormat),
            // time: moment(`${time}`,timeFormat),
            // type: type,
            name: row.name,
            type: row.type,
            // timePass: timePass,
            description: row.description,
            // descriptionUrl:descriptionUrl,
            // place: place,
            // comment:comment,
            // picture: '',
            // video: '',
            // map: '',
            // mentor:'',
            // // showComment: row.allowComment

          }}
          // onFinish={(values)=> {
          //   // .then((values) => {
          //   //   // form.resetFields();
          //   onUpdateEvent(eventId,values)
          // }}
          
          >
          
        <Form.Item name='name' ><Input className={style}/></Form.Item>
        <Form.Item name='type' label="Тип события">
          <Select>
            <Select.Option value='Self education'>Self education</Select.Option>
            <Select.Option value='Deadline'>Deadline</Select.Option>
            <Select.Option value='Task'>Task</Select.Option>
            <Select.Option value='Test'>Test</Select.Option>
            <Select.Option value='Lecture'>Lecture</Select.Option>
            <Select.Option value='Screening'>Screening</Select.Option>
            <Select.Option value='Meetup'>Meetup</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='description' label='Описание'><Input.TextArea /></Form.Item>
        </Form>
 
        </Card> : 
        <EditedPage event={row} eventId={eventId} onUpdateEvent={onUpdateEvent}/>
      } 
        
        
      </Row>

    )
}

export default Page;
