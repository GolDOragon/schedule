import React from 'react';
import {Modal, Form, Input, InputNumber, Select, DatePicker, TimePicker} from 'antd';
import 'antd/dist/antd.css';

function AddEventModal(props) {
  const [form] = Form.useForm();
  const [eventType, setEventType] = React.useState('');
  const { Option } = Select;
  const children = [];
  for (let i = 0; i < props.organizers.length; i++) {
    children.push(<Option key={props.organizers[i].id}>{props.organizers[i].name}</Option>);
  }
  return (
    <Modal
      visible={props.visible}
      title="Create new event"
      okText="Create event"
      cancelText="Cancel"
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
        //time: moment('23:59:00', 'HH:mm'),
        timePass: '1',
        place: 'Online',
        comment: '',
        picture: '',
        video: '',
        map: '',
        mentor: '',
      }}
      >
      <Form.Item name='type' label='Event type'>
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
      <Form.Item name='name' label='Name' rules={[{required: true, message: 'Это обязательное поле'}]}><Input /></Form.Item>
      <Form.Item name='dateTime' label='Date' rules={[{required: true, message: 'Это обязательное поле'}]}><DatePicker /></Form.Item>
      <Form.Item name='description' label='Description'><Input.TextArea /></Form.Item>
      <Form.Item name='descriptionUrl' label='Link' hidden={eventType === 'Deadline' && true}><Input /></Form.Item>
      <Form.Item name='time' label='Time' hidden={(eventType === 'Self education' || eventType === 'Screening') && true}><TimePicker format={'HH:mm'}/></Form.Item>
      <Form.Item name='place' label='Place' hidden={(eventType !== 'Lecture' && eventType !== 'Meetup') && true}>
        <Select>
          <Select.Option value='Online'>Online</Select.Option>
          <Select.Option value='Offline'>Offline</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.place !== currentValues.place}
       >
         {({ getFieldValue }) => {
           return getFieldValue('place') === 'Offline' ? (
             <Form.Item
               name="map"
               label="Location"
             >
               <Input />
             </Form.Item>
           ) : null;
         }}
       </Form.Item>
      <Form.Item name='timePass' label='Duration' hidden={(eventType === 'Deadline' || eventType === 'Screening') && true}><InputNumber formatter={value => `${value}h`} step={0.5} min={0.5}/></Form.Item>
      <Form.Item name='comment' label='Comment'><Input.TextArea /></Form.Item>
      <Form.Item name='picture' label='Picture' hidden={(eventType === 'Deadline' || eventType === 'Test') && true}><Input /></Form.Item>
      <Form.Item name='video' label='Video' hidden={(eventType === 'Deadline' || eventType === 'Test' || eventType === 'Deadline') && true}><Input /></Form.Item>
      <Form.Item name='mentor' label='Mentor'>
        <Select>
          {children}
        </Select>
      </Form.Item>
    </Form>
    </Modal>
  );
};

export default AddEventModal;
