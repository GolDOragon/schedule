import React  from 'react';
import './table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';

function Table(props) {
  const columns = [
    {dataField: 'eventId', text: 'ID', hidden: true},
    {dataField: 'name', text: 'Название', sort: true},
    {dataField: 'description', text: 'Описание', sort: true},
    {dataField: 'descriptionUrl', text: 'Ссылка на событие', sort: true},
    {dataField: 'type', text: 'Событие', sort: true,
      editor: {
        type: Type.SELECT,
        options: [{
          value: 'self education',
          label: 'self education'
        }, {
          value: 'deadline',
          label: 'deadline'
        }, {
          value: 'task',
          label: 'task'
        }, {
          value: 'test',
          label: 'test'
        }, {
          value: 'lecture',
          label: 'lecture'
        }, {
          value: 'screening',
          label: 'screening'
        }]
      }},
    {dataField: 'dateTime', text: 'Дата', sort: true, editor: {type: Type.DATE}},
    {dataField: 'time', text: 'Время', sort: true},
    {dataField: 'place', text: 'Место', sort: true, editor: {
      type: Type.SELECT,
      options: [{
        value: 'Online',
        label: 'Online'
      }, {
        value: 'Offline',
        label: 'Offline'
      }]
    }},
    {dataField: 'timePass', text: 'Время на выполнение', sort: true},
    {dataField: 'comment', text: 'Комментарий', sort: true, editor: {type: Type.TEXTAREA}}
  ];
  const defaultSorted = [{dataField: 'name', order: 'desc'}];
  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    clickToEdit: true,
    hideSelectColumn: true,
    onSelect: (row) => {
      props.onSelect(row)
    }
  }
  
  return (
    <div className="table-wrapper">
      <div>
        <BootstrapTable
        keyField='id'
        data={props.items}
        columns={columns}
        defaultSorted={defaultSorted}
        selectRow={selectRow}
        cellEdit={cellEditFactory({
          mode: 'dbclick',
          afterSaveCell: (oldValue, newValue, row, column) => {props.onEdit(newValue, row)}
        })}
        />
      </div>
    </div>
  );
}

export default Table;