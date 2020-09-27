import React  from 'react';
import './app.css';
import ListRS from '../listRS/listRS';
import  { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import NewHeader from '../header/header';
import AddEventModal from '../addEventModal/addEventModal';
import AddMentorModal from '../addMentorModal/addMentorModal';
import AntTable from '../table/table';
import HideColumns from '../table/hideColumns';
import {EventCalendar} from '../calendar/EventCalendar'
import {Button, Layout, Menu, Select} from 'antd';
import 'antd/dist/antd.css';
import ScheduleApiService from '../../services/scheduleApi-service';
import Page from '../page/page';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const  App = () => {
  const TYPES = ['Date', 'Name', 'Description', 'Link', 'Event type', 'Time', 'Place', 'Duration', 'Comment', 'Mentor'];
  const [items, setItems] = React.useState([]);
  const [userType, setUserType] = React.useState('mentor');
  const [visible, setVisible] = React.useState(false);
  const [visibleM, setVisibleM] = React.useState(false);
  const [organizers, setOrganaizers] = React.useState([]);
  const [redirect, setRedirect] = React.useState('/');
  const [displayedCols, setDisplayedCols] = React.useState(TYPES);
  const { Option } = Select;


  function onCreate(values) {
    ScheduleApiService.addEvent(
      values.dateTime && values.dateTime.format('YYYY-MM-DD'),
      values.time && values.time.format(),
      values.type,
      values.name,
      values.timePass,
      values.description,
      values.descriptionUrl,
      values.place,
      '', //values.timeZone
      values.comment,
      values.picture,
      values.video,
      values.map,
      values.mentor,
      ''
    )
    .then((data) => {
       data.map((item) => {return item.key = item.id})
       return data;
    })
    .then((data) => {setItems(data)})
    setVisible(false);
  };

  function onUpdateEvent(eventId, values) {
    ScheduleApiService.updateEvent(eventId,
      values.dateTime && values.dateTime.format('YYYY-MM-DD'),
      values.time && values.time.format(),
      values.type,
      values.name,
      values.timePass && `${values.timePass}`,
      values.description,
      values.descriptionUrl,
      values.place,
      '', 
      values.comment,
      values.picture,
      values.video,
      values.map,
      values.mentor,
      values.showComment
    )
    .then((data) => {
      data.map((item) => {return item.key = item.id})
      return data;
    })
    .then((data) => {setItems(data)})
  };

  function onMentorCreate(values) {
    ScheduleApiService.addOrganizer(values)
    .then((data) => {setOrganaizers(data)})
    setVisibleM(false);
  }

  function onSelect(row) {
    const url = `/page?${row.id}`;
    setRedirect(url);
  }

  function onUserChange(user) {
    setUserType(user);
  }

  function onDeleteEvent(eventId) {
    ScheduleApiService.deleteEvent(eventId)
    .then((data) => {
       data.map((item) => {return item.key = item.id})
       return data;
    })
    .then((data) => {setItems(data)});
  }

  function onHideColumn(values) {
    setDisplayedCols(values);
  }

  React.useEffect(() => {
    ScheduleApiService.getAllEvents()
    .then((data) => {
       data.map((item) => {return item.key = item.id})
       return data;
    })
    .then((data) => {setItems(data)});
  }, []);

  React.useEffect(() => {
    ScheduleApiService.getAllOrganizers()
    .then((data) => {
       data.map((item) => {return item.key = item.id})
       return data;
    })
    .then((data) => {setOrganaizers(data)});
  }, []);

  return (
    <Router>
     <Layout>
        {redirect !== '/' && <Redirect to={redirect} />}
          <Header   style={{ position: 'fixed', zIndex: 9999, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                  <div className="logo" />
                  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                      <Menu.Item key="1">
                          <Link className="rs-nav-link" to="/">Table</Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                          <Link className="rs-nav-link" to="/calendar">Calendar</Link>
                      </Menu.Item>
                      <Menu.Item key="3">
                          <Link className="rs-nav-link" to="/list">List</Link>
                      </Menu.Item>
                  </Menu>
              </div>
              <div className="right-block-btn">
                  {userType === 'mentor' && <Button type="primary" onClick={() => {setVisible(true)}}>Create event</Button> }
                  {userType === 'mentor' && <Button className="secondBtn" type="primary" onClick={() => {setVisibleM(true)}}>Create mentor</Button> }
                  <Select defaultValue="mentor" name="userType" style={{ width: 120 }} onChange={onUserChange}>
                      <Option value="student">Студент</Option>
                      <Option value="mentor">Ментор</Option>
                  </Select>
              </div>

          </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <AddEventModal visible={visible} onCreate={onCreate} organizers={organizers} onCancel={() => {setVisible(false)}}/>
                <AddMentorModal visible={visibleM} onCreate={onMentorCreate} onCancel={() => {setVisibleM(false)}}/>
            <Route path="/" exact>
              <HideColumns onHideColumn={onHideColumn} types={TYPES}/>
              <AntTable
                items={items}
                onUpdateEvent={onUpdateEvent}
                onSelect={onSelect}
                userType={userType}
                organizers={organizers}
                onDeleteEvent={onDeleteEvent}
                displayedCols={displayedCols}
                />
            </Route>
            <Route path="/calendar">
              <EventCalendar items={items}/>
            </Route>
            <Route path="/list">
                <ListRS items={items} onSelect={onSelect} organizers={organizers}/>
            </Route>
            <Route path="/page">
              <Page items={items} userType={userType} organizers={organizers} onSelect={onSelect}/>
            </Route>
            </div>
        </Content>
         <Footer style={{ textAlign: 'center' }}>Schedule ©2020 Created by Team-26</Footer>
      </Layout>
    </Router>
  )
}

export default App;
