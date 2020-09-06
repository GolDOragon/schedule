import React, { Component } from 'react';
import './list.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Row, Col, Card } from 'antd';
import ScheduleApiService from '../../services/scheduleApi-service';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export default class List extends Component {

    scheduleApiService = new ScheduleApiService();

    state = {
        event: {},
        collapsed: true
    };

    constructor() {
        super();
        this.updateEvent();
    };

    onEventLoaded = (event) => {
        this.setState({event});
    };

    onOrganizerLoaded = (organizer) => {
        this.setState({organizer: {
                name: organizer.name
            }});
    }

    updateEvent() {
        const id = 'nbG5bWM8NqUY9UOj6rWW';
        this.scheduleApiService
            .getEvent(id)
            .then(this.onEventLoaded);
    };

    updateOrganizer = () => {
        const id = 'H1DP9yWIwO5CTKBPLllD';
        this.scheduleApiService
            .getOrganizer(id)
            // .then(this.onOrganizerLoaded)
            .then((organizer) => {
                console.log(organizer.name)
                // return organizer.name;
            })

    };
    add = () => {
        this.scheduleApiService
            .addEvent({
                event: {
                    name: 'testWithoutData',
                    timePass: '16h',
                }
            })
    };
    deleteEvent = () =>{
        this.scheduleApiService
            .deleteEvent('yUMFUXCclbHtcmXclBYQ')
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };



    render() {

        const  { event: { name, type, descriptionUrl, description, place},
        }= this.state;
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            W1
                        </Menu.Item>
                        <Menu.Item key="2">
                            W2
                        </Menu.Item>
                        <Menu.Item key="3">
                            W3
                        </Menu.Item>
                        <Menu.Item key="4">
                            W4
                        </Menu.Item>
                        <Menu.Item key="5">
                            W5
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <div className="site-card-border-less-wrapper">
                            <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                                <Col span={6}>
                                    <Card title="Пн." >
                                        Card content
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card title="Вт.">
                                        Card content
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card title="Ср.">
                                        Card content
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card title="Чт.">
                                        Card content
                                    </Card>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Card title="Пт." >
                                        Card content
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card title="Сб.">
                                        Card content
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card title="Вс.">
                                        Card content
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}