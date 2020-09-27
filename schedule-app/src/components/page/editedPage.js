import React, { useState } from 'react'
import { Card, Row, Col, Input, Form, Select, DatePicker, TimePicker, InputNumber, Checkbox, Button, Space} from 'antd';
import moment from 'moment';
import { EditOutlined} from '@ant-design/icons';
import './page.css';
const EditedPage = (props)=> {
  const [form] = Form.useForm();
  const {row :{dateTime, time, type, name, timePass, description, descriptionUrl, place, comment, picture, video, map, showComment}, eventId, organizer} = props;
  const timeFormat = 'HH:mm';
  const dateFormat = 'YYYY-MM-DD';
  const [allowComment, setAllowComment] = useState(showComment);
  // const [allowComment, setAllowComment] = useState('true');
  const { Option } = Select;
  const children = [];
  for (let i = 0; i < props.organizers.length; i++) {
    children.push(<Option key={props.organizers[i].id}>{props.organizers[i].name}</Option>);
  }

 
  const onChange = (event) => {
    setAllowComment(!event.target.checked) 
  }

    return (
      
      <Card
        className="card m-auto" 
        actions={
          <EditOutlined key="edit" />
        }>
        
        <Form
          form={form}
          className="m-auto" 
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 20 }}
          layout="vertical"
          initialValues={{ 
            dateTime: moment(`${dateTime}`,dateFormat),
            time: moment(`${time}`,timeFormat),
            type: type,
            name: name,
            timePass: timePass,
            description: description,
            descriptionUrl:descriptionUrl,
            place: place,
            picture: picture,
            video: video,
            map: map,
            mentor: organizer.id,
            showComment: allowComment,
            comment: comment,
            map:map

          }}
          onFinish={(values)=> {
            values.dateTime = values.dateTime.format('YYYY-MM-DD');
            values.time = values.time.format();
            props.onUpdateEvent(eventId, values)
          }}
        >
        
          <Form.Item name='name' label="Название события"><Input /></Form.Item>
  
          <Row >
            <Col lg={8} md={8} xs={12}>
              <Form.Item  name='type' label="Тип события">
                <Select >
                  <Select.Option value='Self education'>Self education</Select.Option>
                  <Select.Option value='Deadline'>Deadline</Select.Option>
                  <Select.Option value='Task'>Task</Select.Option>
                  <Select.Option value='Test'>Test</Select.Option>
                  <Select.Option value='Lecture'>Lecture</Select.Option>
                  <Select.Option value='Screening'>Screening</Select.Option>
                  <Select.Option value='Meetup'>Meetup</Select.Option>
                </Select>
              </Form.Item>
            </Col>
           
            <Col  lg={4} md={4} xs={12}><Form.Item name='dateTime' label="Дата" ><DatePicker /></Form.Item></Col>
            <Col  lg={4} md={4} xs={12} ><Form.Item name='time' label='Время' hidden={(type === 'Self education' || type === 'Screening') && true}><TimePicker /></Form.Item></Col>
            <Col  lg={8} md={8} xs={12} ><Form.Item name='timePass' label="Время выполнения"><InputNumber formatter={value => `${value}h`} step={0.5} /></Form.Item></Col>
          </Row>
          
          <Form.Item name='mentor' label='Ментор'>
            <Select>
              {children}
            </Select>
          </Form.Item>
         
          <Form.Item name='description' label='Описание'><Input.TextArea /></Form.Item>
          <Form.Item name='descriptionUrl' label='Ссылка на ТЗ' ><Input /></Form.Item>
          <Form.Item name='place' label='Место проведения' ><Input /></Form.Item>
          <Form.Item name='map' label='Адресс' ><Input /></Form.Item>
          <Form.Item name='video' label='Видео материалы' ><Input /></Form.Item>
          <Form.Item name='picture' label='Изображения' ><Input /></Form.Item>
          <Form.Item name='' label='Изображения' ><Input /></Form.Item>
          <Checkbox name='showComment' onChange={onChange}>Разрешить оставлять комментарий</Checkbox>
          <Form.Item style={{paddingTop: 15}}><Button  type="primary" htmlType="submit">Сохранить</Button></Form.Item>
        </Form>
      </Card>   
    )  
}

export default EditedPage;