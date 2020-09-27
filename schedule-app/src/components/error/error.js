import React from 'react';
import { Row, Col, Divider } from 'antd';

const Error = () => {

  return (
    <Row>
      <Col className='mx-auto  d-flex'>
        <h3 className='title'>404</h3>
        <Divider type="vertical" />
        <p>This page could not be found</p>
      </Col>
    </Row>
  )
}
export default Error;