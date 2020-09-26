import React, { Component, useState } from 'react';
import './listRS.css';
import 'antd/dist/antd.css';
import { Layout, Button, List, Card, Rate , Space, Tag, Empty, Avatar} from 'antd';
import {
    MessageOutlined, LikeOutlined, StarOutlined,
    EditOutlined, EllipsisOutlined, SettingOutlined,
    BarsOutlined, AppstoreOutlined, AuditOutlined, FieldTimeOutlined
} from '@ant-design/icons';

const {Content } = Layout;
const { Meta } = Card;


const ListRS = ({ items, onSelect, organizers }) => {
    const [type, setType] = useState('list');

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const CheckType = ({ type }) => {
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

    const Mentor = ({ mentor, organizers }) => {
        let fullMentor = {};
        organizers.forEach((item) => {
            if (item.id === mentor) fullMentor = item;
        });
        return <div className="mentor-block"><Avatar src={fullMentor.face} />
            <h4 className="ant-list-item-meta-title">
                {fullMentor.name}
            </h4></div>
    }

    let view;

    if(type === 'list'){
        view =  <List
            pagination={{
                pageSize: 10,
            }}
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={items}
            renderItem={item => (
                <List.Item
                    actions={[
                        <CheckType type={item.type}/>,
                        <Button type="link" size='large' onClick={() => onSelect(item)}>
                            More
                        </Button>
                    ]}
                    >

                    <List.Item.Meta
                        avatar={
                            <Mentor mentor={item.mentor} organizers={organizers} />
                        }
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
                pageSize: 10,
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
                                More
                            </Button>
                        ]}
                    >
                        <Meta
                            avatar={
                               <Mentor mentor={item.mentor} organizers={organizers} />
                            }
                            title={<div>{item.name}</div>}

                            description={<div>

                                <span>{item.time.format('HH:mm')}</span>
                                <span> | </span>
                                <span>{item.dateTime.format('YYYY-MM-DD')}</span>
                                <span> | <FieldTimeOutlined />{item.timePass}</span>
                                <br/>
                                {item.description}
                                <br/>
                                <CheckType type={item.type}/>
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
                pageSize: 10,
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
                        avatar={
                            <Mentor mentor={item.mentor} organizers={organizers} />
                        }
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
        <Layout className="site-layout list-rs">
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