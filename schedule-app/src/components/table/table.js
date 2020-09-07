import React  from 'react';
import './table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

function Table(props) {
  const columns = [
    {dataField: 'name', text: 'Название', sort: true},
    {dataField: 'description', text: 'Описание', sort: true},
    //{dataField: 'descriptionUrl', text: 'Ссылка на событие', sort: true},
    {dataField: 'type', text: 'Событие', sort: true},
    {dataField: 'dateTime', text: 'Дата', sort: true},
    {dataField: 'time', text: 'Время', sort: true},
    {dataField: 'place', text: 'Место', sort: true},
    {dataField: 'comment', text: 'Комментарий', sort: true}
  ];
  const defaultSorted = [{dataField: 'ourid', order: 'desc'}];
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