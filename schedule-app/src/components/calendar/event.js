let List = [];
function Array(props1) {
  for(let i = 0; i < props1.items.length; i++){
    let name=props1.items[i].name;
    let time;
    if(props1.items[i].time === undefined || props1.items[i].time.length === 0){
    time = "";
    }
    else{
    time = 'T' + props1.items[i].time;
    }
    let date=props1.items[i].dateTime;
    let place=props1.items[i].place;
    let type=props1.items[i].type;
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
    List.push({ title: "[" + type + "] " + name + " (" + place +")", backgroundColor: typeColor, start: date + time})
  }
}

export {Array, List};
