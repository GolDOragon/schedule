import React from 'react';
import {Modal, Form, Input } from 'antd';
import 'antd/dist/antd.css';

function AddMentorModal(props) {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={props.visible}
      title="Create new mentor"
      okText="Create mentor"
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
      labelCol={{span: 8}}
      wrapperCol={{span: 14}}
      layout='horizontal'
      initialValues={{
        name: '',
        gitLink: '',
        face: '',
      }}
      >
      <Form.Item name='name' label='Name' rules={[{required: true, message: 'Это обязательное поле'}]}><Input /></Form.Item>
      <Form.Item name='gitLink' label='Link to profile' rules={[{required: true, message: 'Это обязательное поле'}]}><Input /></Form.Item>
      <Form.Item name='face' label='Link to photo' rules={[{required: true, message: 'Это обязательное поле'}]}><Input /></Form.Item>
    </Form>
    </Modal>
  );
};

export default AddMentorModal;
