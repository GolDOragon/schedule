import React from 'react';
import './table.css';
import { Table, Input, Button, Space, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class AntTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],
  };

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
    const columns = [
      {dataIndex: 'dateTime',
        key: 'dateTime',
        title: 'Дата',
        className: 'dateTime',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.dateTime) - new Date(b.dateTime),
        sortDirections: ['descend', 'ascend'],

      },
      {dataIndex: 'name',
        key: 'name',
        title: 'Название',
        ...this.getColumnSearchProps('name'),
        sorter: (a, b) => a.name.localeCompare(b.name),

      },
      {dataIndex: 'description',
        key: 'description',
        title: 'Описание',
        ...this.getColumnSearchProps('description'),

      },
      {dataIndex: 'descriptionUrl', key: 'descriptionUrl', title: 'Ссылка',
        render: link => {
          if (link.length === 0) return false;
          return <a target="_blank" rel="noopener noreferrer" href={link}>Ссылка</a>
        }
      },
      {dataIndex: 'type',
        key: 'type',
        title: 'Событие',
        render: type => {
                let color='';
                if (type === 'Deadline') {color = '#f5222d'}
                if (type === 'Self education') {color = 'green'}
                if (type === 'Task') {color = 'orange'}
                if (type === 'Test') {color = 'blue'}
                if (type === 'Lecture') {color = 'cyan'}
                if (type === 'Screening') {color = 'magenta'}
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
            value: 'Screening',
            text: 'Screening'
          }],
        onFilter: (value, record) => record.type.indexOf(value) === 0,

      },
      {dataIndex: 'time', key: 'time', title: 'Время', },
      {dataIndex: 'place', key: 'place', title: 'Место', },
      {dataIndex: 'timePass', key: 'timePass', title: 'Срок', },
      {dataIndex: 'comment', key: 'comment', title: 'Комментарий', },
      {dataIndex: 'mentor', key: 'mentor', title: 'Ментор',
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
      }
    ];

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };

    return (
      <div className="table-wrapper tablesaw-overflow">
        <div>
          <Table dataSource={this.props.items} columns={columns} rowSelection={rowSelection}
          onRow={(record, rowIndex) => {
              return {
                onDoubleClick: () => this.props.onSelect(record),
                //onClick: () => {this.selectRow(record);},
              };
            }}
          />;
        </div>
      </div>
    );
  }
}

export default AntTable;
