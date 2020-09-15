import React from 'react'
import './сard.css';


const  Card = (props) => {

    // получение данных расписания для выбора и рендера строки
    let taskLongId=props.viewId
    let objData=Object.values(props.items)

    let TaskInArrayId;
    function findIdTask() {
        for (let i = 0; i < objData.length; i++) {
            if (taskLongId === objData[i].id) {
                TaskInArrayId = i;
            }
        }
        return TaskInArrayId
    }
    findIdTask();

    if (objData[TaskInArrayId] === undefined) {objData[TaskInArrayId]={}}
    let Data=objData[TaskInArrayId]

// ------- как отсюда отдать данные и как сформировать новый объект с данными ?  ------------------

      function changeValue (e) {
      // props.changeTitle(viewId, e.currentTarget.value);
      console.log (e.currentTarget.id, e.currentTarget.value, taskLongId)
    }
 // ------------------------------------------------------------------------------------------------

    function TableHeader() {
    let headerKeys = Object.keys(Data)
    return headerKeys.map((key, index) => {
      return <tr index={index}>{key.toUpperCase()}:</tr>
    }) }

    function TableElement() {
    let objValue = Object.values(Data)
    return objValue.map((element,id) => {
      return <tr> <input
      onChange={changeValue}
      className="input"
      value={element}
      id={id} />
      </tr>
    })  }


  return (


        <div id="fogging">
            <div id="okno">
                    <div className="taskBox">
                        <table id="table" >
                          {TableHeader()}
                        </table>
                        <table id="table">
                          {TableElement()};
                        </table>
                    </div>
                       <button className="button" onClick={()=>props.onDeleteDescription()}>Удалить распиание</button>
                       <button className="button" onClick={()=>props.onSaveDescription()}>Сохранить</button>
                       <button className="button" onClick={()=>props.onCloseDescription()}>Закрыть</button>
            </div>
        </div>

)
}

export default Card;
