import React from 'react';
import {Modal, Form, Input } from 'antd';
import 'antd/dist/antd.css';

function AddMentorModal(props) {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={props.visible}
      title="Создание нового ментора"
      okText="Создать ментора"
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
      labelCol={{span: 8}}
      wrapperCol={{span: 14}}
      layout='horizontal'
      initialValues={{
        name: '',
        gitLink: '',
        face: '',
      }}
      >
      <Form.Item name='name' label='Имя' rules={[{required: true, message: 'Это обязательное поле'}]}><Input /></Form.Item>
      <Form.Item name='gitLink' label='Ссылка на профиль' rules={[{required: true, message: 'Это обязательное поле'}]}><Input /></Form.Item>
      <Form.Item name='face' label='Ссылка на фото' rules={[{required: true, message: 'Это обязательное поле'}]}><Input /></Form.Item>
    </Form>
    </Modal>
  );
};

export default AddMentorModal;
