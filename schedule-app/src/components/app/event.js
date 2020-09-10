import React from 'react';

let List = [];
function Array(props) {
  console.log(props.items);
  for(let i = 0; i < props.items.length; i++){
    let name=props.items[i].name;
    let time=props.items[i].time;
    let date=props.items[i].dateTime;
    let place=props.items[i].place;
    let type=props.items[i].type;
    let typeColor;
    if(type === 'self education'){
      typeColor = '#d9d9d9';
    }
    if(type === 'deadline'){
      typeColor = '#f5222d';
    }
    if(type === 'task'){
      typeColor = '#b7eb8f';
    }
    if(type === 'test'){
      typeColor = '#4e86ba';
    }
    if(type === 'lecture'){
      typeColor = '#f2e75ffc';
    }
    if(type === 'screening'){
      typeColor = '#a55ff2fc';
    }
    List.push({ title: name + " (" +place +")", backgroundColor: typeColor, start: date + 'T12:00', allDay : false })
  }
    console.log(List);
}

export {Array, List};
