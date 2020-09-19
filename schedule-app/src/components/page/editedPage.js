import React, { useState } from 'react'
import { Card, Input, Form, Radio, Select, DatePicker, TimePicker, InputNumber, Checkbox, Button} from 'antd';
import moment from 'moment';
import { EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';

const EditedPage = (props)=> {
  const [form] = Form.useForm();
  const {event :{dateTime, time, type, name, timePass, description, descriptionUrl, place, comment, mentor, showComment}, eventId, onUpdateEvent} = props;
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
          form={form}
          className="m-auto" 
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ 
            dateTime: moment(`${dateTime}`,dateFormat),
            time: moment(`${time}`,timeFormat),
            type: type,
            name: name,
            timePass: timePass,
            description: description,
            descriptionUrl:descriptionUrl,
            place: place,
            comment:comment,
            picture: '',
            video: '',
            map: '',
            mentor:''

          }}
          onFinish={(values)=> {
            // .then((values) => {
            //   // form.resetFields();
            onUpdateEvent(eventId,values)
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
          <Form.Item name='name' label="Название события"><Input /></Form.Item>
          <Form.Item name='type' label="Тип события">
            <Select >
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
          <Form.Item name='dateTime' label="Дата" ><DatePicker  /></Form.Item>
          <Form.Item name='time' label='Время' hidden={(type === 'Self education' || type === 'Screening') && true}><TimePicker /></Form.Item>
          <Form.Item name='timePass' label="Время выполнения"><InputNumber formatter={value => `${value}h`} step={0.5} /></Form.Item>
          <Form.Item name='mentorName' label='Имя' ><Input /></Form.Item>
          <Form.Item name='gitLink' label='Ссылка на профиль'><Input /></Form.Item>
          <Form.Item name='face' label='Ссылка на фото'><Input /></Form.Item>
          <Form.Item name='description' label='Описание'><Input.TextArea /></Form.Item>
          <Form.Item name='descriptionUrl' label='Ссылка на ТЗ' ><Input /></Form.Item>
          <Checkbox name='showComment' label="Разрешить оставлять комментарий" >Checkbox</Checkbox>
          <Form.Item><Button type="primary" htmlType="submit">Сохранить</Button></Form.Item>
        </Form>
      </Card>   
    )  
}

export default EditedPage;