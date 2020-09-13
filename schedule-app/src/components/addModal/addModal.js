import React from 'react';
import {Modal, Form, Input, Select, DatePicker, TimePicker} from 'antd';
import 'antd/dist/antd.css';

function AddModal(props) {
  const [form] = Form.useForm();
  const [eventType, setEventType] = React.useState('');

  return (
    <Modal
      visible={props.visible}
      title="Create a new collection"
      okText="Create"
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
            console.log('Validate Failed:', info);
          });
      }}
    >
    <Form
      form={form}
      labelCol={{span: 5}}
      wrapperCol={{span: 14}}
      layout='horizontal'
      initialValues={{
        type: 'task',
        name: '',
        description: '',
        descriptionUrl: '',
        dateTime: '',
        time: '',
        timePass: '',
        place: 'online',
        comment: '',
      }}
      >
      <Form.Item name='type' label='Событие'>
        <Select onChange={setEventType}>
          <Select.Option value='selfEducation'>Self education</Select.Option>
          <Select.Option value='deadline'>Deadline</Select.Option>
          <Select.Option value='task'>Task</Select.Option>
          <Select.Option value='test'>Test</Select.Option>
          <Select.Option value='lecture'>Lecture</Select.Option>
          <Select.Option value='screening'>Screening</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name='name' label='Название' rules={[{required: true, message: 'Это обязательное поле'}]}><Input /></Form.Item>
      <Form.Item name='description' label='Описание'><Input.TextArea /></Form.Item>
      {eventType !== 'deadline' && <Form.Item name='descriptionUrl' label='Ссылка'><Input /></Form.Item>}
      <Form.Item name='dateTime' label='Дата'><DatePicker /></Form.Item>
      {(eventType !== 'selfEducation' || eventType !== 'screening') && <Form.Item name='time' label='Время'><TimePicker /></Form.Item>}
      {eventType === 'lecture' && <Form.Item name='place' label='Место'>
        <Select>
          <Select.Option value='online'>Online</Select.Option>
          <Select.Option value='offline'>Offline</Select.Option>
        </Select>
      </Form.Item>}
      {(eventType === 'selfEducation' || eventType === 'task' || eventType === 'test') && <Form.Item name='timePass' label='Срок'><Input /></Form.Item> }
      <Form.Item name='comment' label='Комментарий'><Input.TextArea /></Form.Item>
    </Form>
    </Modal>
  );
};

export default AddModal;
