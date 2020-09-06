import React from 'react';
import './app.css';
import Table from '../table/table';
import List from '../list/list';
// import your component

const  App = () => {
  return (
    //add your component into div
    <div>
        <Table />
        <hr></hr>
        <List />
    </div>
  ) 
}

export default App;