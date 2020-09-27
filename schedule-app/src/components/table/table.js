import React from 'react';
import './table.css';
import { Table, Input, Button, Space, Tag, Form, InputNumber, Popconfirm, Select, DatePicker, TimePicker, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class AntTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],
    data: '',
    editingKey: '',
  };

  formRef = React.createRef();


  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    this.setState({ selectedRowKeys });
  }
  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
    console.log(selectedRowKeys);
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    //Editable cells begin
    const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {
      const organizers = [];
      for (let i = 0; i < this.props.organizers.length; i++) {
        organizers.push(<Select.Option key={this.props.organizers[i].id}>{this.props.organizers[i].name}</Select.Option>);
      }
      let inputNode = <Input />;
      if (dataIndex === 'type') {
        inputNode = <Select>
                      <Select.Option value='Self education'>Self education</Select.Option>
                      <Select.Option value='Deadline'>Deadline</Select.Option>
                      <Select.Option value='Task'>Task</Select.Option>
                      <Select.Option value='Test'>Test</Select.Option>
                      <Select.Option value='Lecture'>Lecture</Select.Option>
                      <Select.Option value='Meetup'>Meetup</Select.Option>
                      <Select.Option value='Screening'>Screening</Select.Option>
                    </Select>
      }
      if (dataIndex === 'dateTime') {inputNode = <DatePicker format={'YYYY-MM-DD'} />}
      if (dataIndex === 'time') {inputNode = <TimePicker format={'HH:mm'} />}
      if (dataIndex === 'timePass') {inputNode = <InputNumber step={0.5} min={0.5}/>}
      if (dataIndex === 'mentor') {inputNode = <Select>{organizers}</Select>}
      if (dataIndex === 'place') {
        inputNode = <Select>
                      <Select.Option value='Online'>Online</Select.Option>
                      <Select.Option value='Offline'>Offline</Select.Option>
                    </Select>}
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item name={dataIndex} >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };

    const isEditing = (record) => record.key === this.state.editingKey;

    const edit = (record) => {
      this.formRef.current.setFieldsValue({
        id: '',
        dateTime: '',
        name: '',
        description: '',
        descriptionUrl: '',
        type: '',
        time: '',
        place: '',
        timePass: '',
        comment: '',
        mentor: '',
        ...record,
      });
      this.setState({editingKey: record.key})
    };


    const cancel = () => {
      this.setState({editingKey: ''})
    };

    const save = async (key) => {
      try {
        const row = await this.formRef.current.validateFields();
        const newData = [...this.state.data];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          this.setState({data: newData});
          this.setState({editingKey: ''})
        } else {
          newData.push(row);
          this.setState({data: newData});
          this.setState({editingKey: ''})
        }
        this.props.onUpdateEvent(row.id, row);
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
    //Editable cells end
    const columns = [
      {dataIndex: 'id', key: 'id', editable: true, className: 'hidden'},
      {dataIndex: 'dateTime',
        key: 'dateTime',
        title: 'Date',
        className: !this.props.displayedCols.includes('Date') ? 'hidden' : 'dateTime',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.dateTime) - new Date(b.dateTime),
        sortDirections: ['descend', 'ascend'],
        editable: true,
        render: date => {
          return <Tooltip title="Double click to watch the event">{date.format('YYYY-MM-DD')}</Tooltip>;
        },
      },
      {dataIndex: 'name',
        key: 'name',
        title: 'Name',
        ...this.getColumnSearchProps('name'),
        sorter: (a, b) => a.name.localeCompare(b.name),
        editable: true,
        className: !this.props.displayedCols.includes('Name') && 'hidden',
        render: name => {
          return <Tooltip title="Double click to watch the event">{name}</Tooltip>;
        },
      },
      {dataIndex: 'description',
        key: 'description',
        title: 'Description',
        ...this.getColumnSearchProps('description'),
        editable: true,
        className: !this.props.displayedCols.includes('Description') && 'hidden',
        render: description => {
          return <Tooltip title="Double click to watch the event">{description}</Tooltip>;
        },
      },
      {dataIndex: 'descriptionUrl', key: 'descriptionUrl', title: 'Link',
        render: link => {
          if (link.length === 0) return false;
          return <a target="_blank" rel="noopener noreferrer" href={link}>Link</a>
        },
        editable: true,
        className: !this.props.displayedCols.includes('Link') && 'hidden',
      },
      {dataIndex: 'type',
        key: 'type',
        title: 'Event type',
        render: type => {
                let color='';
                if (type === 'Deadline') {color = 'red'}
                if (type === 'Self education') {color = ''}
                if (type === 'Task') {color = 'green'}
                if (type === 'Test') {color = 'blue'}
                if (type === 'Lecture') {color = 'orange'}
                if (type === 'Screening') {color = 'purple'}
                if (type === 'Meetup') {color = 'magenta'}
                return (<Tag color={color} key={type}>{type}</Tag>);
                },
        filters: [{
            value: 'Self education',
            text: 'Self education'
          }, {
            value: 'Deadline',
            text: 'Deadline'
          }, {
            value: 'Task',
            text: 'Task'
          }, {
            value: 'Test',
            text: 'Test'
          }, {
            value: 'Lecture',
            text: 'Lecture'
          }, {
            value: 'Meetup',
            text: 'Meetup'
          }, {
            value: 'Screening',
            text: 'Screening'
          }],
        onFilter: (value, record) => record.type.indexOf(value) === 0,
        editable: true,
        className: !this.props.displayedCols.includes('Event type') && 'hidden',
      },
      {dataIndex: 'time', key: 'time', title: 'Time', editable: true,
        render: time => {
          return time.format('HH:mm');
        },
        className: !this.props.displayedCols.includes('Time') && 'hidden',
      },
      {dataIndex: 'place', key: 'place', title: 'Place', editable: true, className: !this.props.displayedCols.includes('Place') && 'hidden',},
      {dataIndex: 'timePass', key: 'timePass', title: 'Duration', editable: true, className: !this.props.displayedCols.includes('Duration') && 'hidden',},
      {dataIndex: 'mentor', key: 'mentor', title: 'Mentor', editable: true,
      className: !this.props.displayedCols.includes('Mentor') && 'hidden',
      render: mentor => {
                let fullMentor = {};
                this.props.organizers.forEach((item) => {
                  if (item.id === mentor) fullMentor = item;
                });
                const divStyle = {
                  backgroundImage: 'url(' + fullMentor.face + ')',
                };
                if (fullMentor.id) return (
                  <div className="mentor-cell" >
                    <div style={divStyle}></div>
                    <a href={fullMentor.gitLink} target="_blank" rel="noopener noreferrer">{fullMentor.name}</a>
                  </div>
                )
              },
      },
      {title: '',
        dataIndex: 'operation',
        className: this.props.userType === 'student' && 'hidden',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span className="editCell">
              <Tag
                color="default"
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Tag>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <Tag color="default">Cancel</Tag>
              </Popconfirm>
            </span>
          ) : (
            <span className="editCell">
              <Tag color="default" disabled={this.state.editingKey !== ''} onClick={() => edit(record)}>Edit</Tag>
              <Popconfirm title="Sure to delete?" onConfirm={() => this.props.onDeleteEvent(record.id)}>
                <Tag color="error" disabled={this.state.editingKey !== ''}> Delete</Tag>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };

    return (
      <div className="table-wrapper tablesaw-overflow">
        <div>
        <Form ref={this.formRef} component={false}>
          <Table dataSource={this.props.items} columns={mergedColumns} rowSelection={rowSelection}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          /*rowClassName={(record, index) => {
            if(selectedRowKeys.includes(record.id)) {
              return 'hidden';
            }
          }}*/
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: () => this.props.onSelect(record),
              };
            }}
          pagination={{onChange: cancel}}
          />
        </Form>
        </div>
      </div>
    )
  }
}

export default AntTable;
