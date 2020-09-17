import React from 'react';
import {Modal, Form, Input, Select, DatePicker, TimePicker} from 'antd';
import 'antd/dist/antd.css';

function AddEventModal(props) {
  const [form] = Form.useForm();
  const [eventType, setEventType] = React.useState('');
  const timeFormat = 'HH:mm';
  const { Option } = Select;
  const children = [];
  for (let i = 0; i < props.organizers.length; i++) {
    children.push(<Option key={props.organizers[i].id}>{props.organizers[i].name}</Option>);
  }
  return (
    <Modal
      visible={props.visible}
      title="Создание нового события"
      okText="Создать событие"
      cancelText="Отмена"
      onCancel={props.onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            props.onCreate(values);
          })
          .catch((info) => {

          });
      }}
    >
    <Form
      form={form}
      labelCol={{span: 5}}
      wrapperCol={{span: 14}}
      layout='horizontal'
      initialValues={{
        type: 'Task',
        name: '',
        description: '',
        descriptionUrl: '',
        dateTime: '',
        time: '',
        timePass: '',
        place: 'Online',
        comment: '',
        picture: '',
        video: '',
        map: '',
      }}
      >
      <Form.Item name='type' label='Событие'>
        <Select onChange={setEventType}>
          <Select.Option value='Self education'>Self education</Select.Option>
          <Select.Option value='Deadline'>Deadline</Select.Option>
          <Select.Option value='Task'>Task</Select.Option>
          <Select.Option value='Test'>Test</Select.Option>
          <Select.Option value='Lecture'>Lecture</Select.Option>
          <Select.Option value='Meetup'>Meetup</Select.Option>
          <Select.Option value='Screening'>Screening</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name='name' label='Название' rules={[{required: true, message: 'Это обязательное поле'}]}><Input /></Form.Item>
      <Form.Item name='dateTime' label='Дата' rules={[{required: true, message: 'Это обязательное поле'}]}><DatePicker /></Form.Item>
      <Form.Item name='description' label='Описание'><Input.TextArea /></Form.Item>
      <Form.Item name='descriptionUrl' label='Ссылка' hidden={eventType === 'Deadline' && true}><Input /></Form.Item>
      <Form.Item name='time' label='Время' hidden={(eventType === 'Self education' || eventType === 'Screening') && true}><TimePicker format={timeFormat}/></Form.Item>
      <Form.Item name='place' label='Место' hidden={(eventType !== 'Lecture' || eventType !== 'Meetup') && true}>
        <Select>
          <Select.Option value='Online'>Online</Select.Option>
          <Select.Option value='Offline'>Offline</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name='timePass' label='Срок' hidden={(eventType !== 'Self education' || eventType !== 'Task' || eventType !== 'Test') && true}><Input /></Form.Item>
      <Form.Item name='comment' label='Комментарий'><Input.TextArea /></Form.Item>
      <Form.Item name='picture' label='Картинка' hidden={(eventType === 'Deadline' || eventType === 'Test') && true}><Input /></Form.Item>
      <Form.Item name='video' label='Видео' hidden={(eventType === 'Deadline' || eventType === 'Test' || eventType === 'Deadline') && true}><Input /></Form.Item>
      <Form.Item name='map' label='Карта' hidden={(eventType !== 'Lecture' || eventType !== 'Meetup') && true}><Input /></Form.Item>
      <Form.Item name='mentor' label='Ментор'>
        <Select>
          {children}
        </Select>
      </Form.Item>
    </Form>
    </Modal>
  );
};

export default AddEventModal;
