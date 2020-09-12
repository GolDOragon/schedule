import React  from 'react';
import './table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter, dateFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

function Table(props) {
  const selectOptionsType = {
    'self education': 'self education',
    'deadline': 'deadline',
    'task': 'task',
    'test': 'test',
    'lecture': 'lecture',
    'screening': 'screening'
  };

  const selectOptionsPlace = {
    'Online': 'Online',
    'Offline': 'Offline',
  };

  const columns = [
    {dataField: 'eventId', text: 'ID', hidden: true},
    {dataField: 'name', text: 'Название', sort: true, filter: textFilter({placeholder: ' ',})},
    {dataField: 'description', text: 'Описание', sort: true, filter: textFilter({placeholder: ' ',})},
    {dataField: 'descriptionUrl', text: 'Ссылка', sort: true, headerStyle: (colum, colIndex) => {return { width: '15%' };}},
    {dataField: 'type', text: 'Событие', sort: true,
      filter: selectFilter({
        options: selectOptionsType,
        placeholder: ' ',
      }),
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
      },
      headerStyle: (colum, colIndex) => {return { width: '5%' };}
    },
    {dataField: 'dateTime', text: 'Дата', sort: true, editor: {type: Type.DATE}, filter: dateFilter(), headerStyle: (colum, colIndex) => {return { width: '5%' };}},
    {dataField: 'time', text: 'Время', sort: true, filter: textFilter({placeholder: ' ',}), headerStyle: (colum, colIndex) => {return { width: '5%' };}},
    {dataField: 'place', text: 'Место', sort: true,
      filter: selectFilter({
        options: selectOptionsPlace,
        placeholder: ' ',
      }),
      editor: {
      type: Type.SELECT,
      options: [{
        value: 'Online',
        label: 'Online'
      }, {
        value: 'Offline',
        label: 'Offline'
      }]
    },
      headerStyle: (colum, colIndex) => {return { width: '5%' };}
    },
    {dataField: 'timePass', text: 'Срок', sort: true, filter: textFilter({placeholder: ' ',}), headerStyle: (colum, colIndex) => {return { width: '5%' };}},
    {dataField: 'comment', text: 'Комментарий', sort: true, editor: {type: Type.TEXTAREA}}
  ];
  const defaultSorted = [{dataField: 'name', order: 'asc'}];
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
        {props.userType === 'mentor' ? <button onClick={props.onAdd}>Добавить событие</button> : ''}
        <BootstrapTable
        responsive
        keyField='id'
        data={props.items}
        columns={columns}
        defaultSorted={defaultSorted}
        selectRow={selectRow}
        cellEdit={
          props.userType === 'mentor'
            ? cellEditFactory({mode: 'dbclick', afterSaveCell: (oldValue, newValue, row, column) => {props.onEdit(newValue, row)}})
            : cellEditFactory({})
        }
        filter={ filterFactory() }
        pagination={ paginationFactory() }
        />
      </div>
    </div>
  );
}

export default Table;