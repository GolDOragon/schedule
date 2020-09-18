import React, { useState } from 'react'
import { Card, Input, Form, Radio, Select, DatePicker, TimePicker, InputNumber, Switch} from 'antd';
import moment from 'moment';
import { EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';

const EditedPage = (props)=> {

  const {event :{dateTime, time, type, name, timePass, description, descriptionUrl, place, comment, mentor}} = props;
  const timeFormat = 'HH:mm';
  const dateFormat = 'YYYY-MM-DD';
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  }

    return (
    
      <Card
        className="card m-auto" 
        actions={
          // userType === 'mentor' &&  
          [<SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,]
        }>

        <Form
          className="m-auto" 
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ 
            dateTime:dateTime,
            time:'' ,
            type: type,
            name: name,
            timePass: timePass,
            description: description,
            descriptionUrl:descriptionUrl,
            place: place,
            comment:comment,
            // picture: picture,
            // video: video,
            // map: map,
            mentor:mentor
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Form.Item label="Form Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Название события">
            <Input defaultValue={name}/>
          </Form.Item>
          <Form.Item label="Тип события">
            <Select defaultValue={type}>
              <Select.Option >{type}</Select.Option>
              <Select.Option value='Self education'>Self education</Select.Option>
              <Select.Option value='Deadline'>Deadline</Select.Option>
              <Select.Option value='Task'>Task</Select.Option>
              <Select.Option value='Test'>Test</Select.Option>
              <Select.Option value='Lecture'>Lecture</Select.Option>
              <Select.Option value='Screening'>Screening</Select.Option>
              <Select.Option value='Meetup'>Meetup</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="DatePicker" ><DatePicker defaultValue={moment(`${dateTime}`, dateFormat)} format={dateFormat} /></Form.Item>
          <Form.Item name='time' label='Время' hidden={(type === 'Self education' || type === 'Screening') && true}><TimePicker defaultValue={time} format={timeFormat}/></Form.Item>
          <Form.Item label="Время выполнения"><InputNumber defaultValue={timePass} min={0} max={100} formatter={value => `${value}h`} parser={value => value.replace('h', '')}/></Form.Item>
          <Form.Item name='name' label='Имя' defaultValue={mentor}><Input /></Form.Item>
          <Form.Item name='gitLink' label='Ссылка на профиль'><Input /></Form.Item>
          <Form.Item name='face' label='Ссылка на фото'><Input /></Form.Item>
          <Form.Item name='description' label='Описание' defaultValue={description}><Input.TextArea /></Form.Item>
          <Form.Item name='descriptionUrl' label='Ссылка на ТЗ' defaultValue={descriptionUrl}><Input /></Form.Item>
          <Form.Item name="switch" label="Разрешить оставлять комментарии" valuePropName="checked"><Switch /></Form.Item>
        </Form>

      </Card>
    
      
    )  
}

export default EditedPage;