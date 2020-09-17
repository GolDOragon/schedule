let ListDemo = [];
let List = [];
function Array(props) {
  for(let i = 0; i < props.items.length; i++){
    let name=props.items[i].name;
    let time;
    if(props.items[i].time === undefined || props.items[i].time.length === 0){
    time = "";
    }
    else{
    time = 'T' + props.items[i].time;
    }
    let date=props.items[i].dateTime;
    let place=props.items[i].place;
    let type=props.items[i].type;
    let typeColor;
        console.log(type);
    if(type === 'Self education'){
      typeColor = '#d9d9d9';
    }
    if(type === 'Deadline'){
      typeColor = '#f5222d';
    }
    if(type === 'Task'){
      typeColor = '#52c41a';
    }
    if(type === 'Test'){
      typeColor = '#1890ff';
    }
    if(type === 'Lecture'){
      typeColor = '#fa8c16';
    }
    if(type === 'Screening'){
      typeColor = '#722ed1';
    }
        console.log(typeColor);
    ListDemo.push({ title: "[" + type + "] " + name + " (" + place +")", backgroundColor: typeColor, start: date + time})
    console.log(ListDemo);
  }
  List=ListDemo;
  ListDemo=[];
}

export {Array, List};
