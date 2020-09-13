import React from 'react';
import {Form, Input, Select, DatePicker, TimePicker} from 'antd';
import 'antd/dist/antd.css';

const AddForm = (props) => {
  const [eventType, setEventType] = React.useState('');

  return (
    <>
      <Form labelCol={{span: 5}} wrapperCol={{span: 14}} layout='horizontal' onFinish={props.handleOk}>
        <Form.Item label='Событие'>
          <Select onChange={setEventType} defaultValue='task'>
            <Select.Option value='selfEducation'>Self education</Select.Option>
            <Select.Option value='deadline'>Deadline</Select.Option>
            <Select.Option value='task'>Task</Select.Option>
            <Select.Option value='test'>Test</Select.Option>
            <Select.Option value='lecture'>Lecture</Select.Option>
            <Select.Option value='screening'>Screening</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Название' rules={[{required: true, message: 'Это обязательное поле'}]}><Input /></Form.Item>
        <Form.Item label='Описание'><Input.TextArea /></Form.Item>
        {eventType !== 'deadline' ? <Form.Item label='Ссылка'><Input /></Form.Item> : ''}
        <Form.Item label='Дата'><DatePicker /></Form.Item>
        {(eventType !== 'selfEducation' || eventType !== 'screening') && <Form.Item label='Время'><TimePicker /></Form.Item>}
        {eventType === 'lecture' ? <Form.Item label='Место'>
          <Select defaultValue='online'>
            <Select.Option value='online'>Online</Select.Option>
            <Select.Option value='offline'>Offline</Select.Option>
          </Select>
        </Form.Item> : ''}
        {(eventType === 'selfEducation' || eventType === 'task' || eventType === 'test') && <Form.Item label='Срок'><Input /></Form.Item> }
        <Form.Item label='Комментарий'><Input.TextArea /></Form.Item>
      </Form>
    </>
  );
};

export default AddForm;
