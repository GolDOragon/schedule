import React, { Component, useState } from 'react';
import './listRS.css';
import 'antd/dist/antd.css';
import { Layout,Button, List, Card} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';

const {Content } = Layout;

const ListRS = ({items}) => {
    const [type, setType] = useState('list');

    if(type === 'list'){
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
                        <Button onClick={() => setType('list')}>Basic list</Button>
                        <Button onClick={() => setType('grid')}>Grid</Button>
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
                    />
                </Content>
            </Layout>
        )
    }else{
        return(
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
                        <Button onClick={() => setType('list')}>Basic list</Button>
                        <Button onClick={() => setType('grid')}>Grid</Button>
                    </div>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                        }}
                        dataSource={items}
                        renderItem={item => (
                            <List.Item>
                                <Card title={item.name}>Card content</Card>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        )
    }
}

export default ListRS;