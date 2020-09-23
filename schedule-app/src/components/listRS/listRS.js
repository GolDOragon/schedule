import React, { Component, useState } from 'react';
import './listRS.css';
import 'antd/dist/antd.css';
import { Layout, Button, List, Card, Rate , Space, Tag, Empty} from 'antd';
import {
    MessageOutlined, LikeOutlined, StarOutlined,
    EditOutlined, EllipsisOutlined, SettingOutlined,
    BarsOutlined, AppstoreOutlined, AuditOutlined, FieldTimeOutlined
} from '@ant-design/icons';

const {Content } = Layout;
const { Meta } = Card;


const ListRS = ({items, onSelect}) => {
    const [type, setType] = useState('list');

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const CheckType = ({ type }) => {
        console.log(type)
        switch (type) {
            case "Deadline":
                return <Tag color="red">{type}</Tag>;
            case "Task":
                return <Tag color="green">{type}</Tag>;
            case "Test":
                return <Tag color="blue">{type}</Tag>;
            case "Screening":
                return <Tag color="purple">{type}</Tag>;
            case "Lecture":
                return <Tag color="orange">{type}</Tag>
            default:
                return <Tag >self education</Tag>
        }
    };

    let view;

    if(type === 'list'){
        view =  <List
            pagination={{
                pageSize: 3,
            }}
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={items}
            renderItem={item => (
                <List.Item
                    actions={[
                        <CheckType type={item.type}/>,
                        <Button type="link" size='large' onClick={() => onSelect(item)}>
                            Смотреть
                        </Button>
                    ]}
                    >

                    <List.Item.Meta

                        title={<div><a href="#">{item.name}</a></div>}
                        description={<div>
                            <span>{item.time.format('HH:mm')}</span>
                            <span> | </span>
                            <span>{item.dateTime.format('YYYY-MM-DD')}</span>
                            <span> | <FieldTimeOutlined />{item.timePass}</span>
                            <br/>
                            {item.description}
                            <br/>
                            <Rate allowHalf defaultValue={2.5} />
                        </div>
                        }
                    />


                </List.Item>
            )}
        />
    }
    if(type === 'grid'){
        view = <List
            pagination={{
                pageSize: 3,
            }}
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
                    <Card
                        style={{ width: 300 }}
                        cover={
                            <Empty />
                        }
                        actions={[
                            <Button type="link" size='large' onClick={() => onSelect(item)}>
                                Смотреть
                            </Button>
                        ]}
                    >
                        <Meta
                            title={<div>{item.type} <CheckType type={item.type}/></div>}
                            description={<div>

                                <span>{item.time.format('HH:mm')}</span>
                                <span> | </span>
                                <span>{item.dateTime.format('YYYY-MM-DD')}</span>
                                <span> | <FieldTimeOutlined />{item.timePass}</span>
                                <br/>
                                {item.description}
                                <br/>
                                <Rate allowHalf defaultValue={2.5} /></div>}
                        />

                    </Card>

                </List.Item>
            )}
        />
    }
    if(type === 'vertical'){
        view =  <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 3,
            }}
            dataSource={items}
            renderItem={item => (
                <List.Item
                    key={item.name}
                    actions={[
                        <CheckType type={item.type}/>,
                        <Button type="link" size='large' onClick={() => onSelect(item)}>
                            Смотреть
                        </Button>
                    ]}
                    extra={
                        <Empty />

                        // <img
                        //     width={272}
                        //     alt="logo"
                        //     src="rs_school.svg"
                        // />
                    }
                >
                    <List.Item.Meta
                        title={<a href={item.href}>{item.name}</a>}
                        description={<div>
                            <span>{item.time.format('HH:mm')}</span>
                            <span> | </span>
                            <span>{item.dateTime.format('YYYY-MM-DD')}</span>
                            <span> | <FieldTimeOutlined />{item.timePass}</span>
                            <br/>
                            {item.description}
                            <br/>
                            <Rate allowHalf defaultValue={2.5} />
                        </div>}
                    />


                </List.Item>
            )}
        />
    }

    return (
        <Layout className="site-layout">
            <Content
                className="site-layout-background"

            >
                <div className="list-rs-btn-group">
                    <Button onClick={() => setType('list')} icon={<BarsOutlined />}></Button>
                    <Button onClick={() => setType('grid')} icon={<AppstoreOutlined />}></Button>
                    <Button onClick={() => setType('vertical')} icon={<AuditOutlined />}></Button>
                </div>

                {view}

            </Content>
        </Layout>
    )
}

export default ListRS;