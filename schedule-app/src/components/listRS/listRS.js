import React, { Component } from 'react';
import './listRS.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Row, Col, Card, Avatar, List } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const ListRS = ({items}) => {

    return (
         <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <div>
                        <button >Basic list</button>
                        <button>Grid</button>
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={items}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<div><a href="#">{item.name}</a> <span>{item.dateTime}</span></div>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />,
                </Content>
        </Layout>
    )

}

export default ListRS;