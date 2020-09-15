import React, {useState} from 'react';
import './сard.css';

class Card extends React.Component {

    state={};
    componentDidMount(){
        this.setState(this.props.items)
    }

    render = () => {
        let headerKeys = Object.keys(this.state)
        let TableHeader=()=> {
            return headerKeys.map((key, index) => {
                return <tr index={index}>{key.toUpperCase()}:</tr>
            }) }

        let objValue=Object.values(this.state);
        let TableElement=()=> {
            return objValue.map((element,id) => {
                return <tr> <input
                    onChange={changeValue}
                    className="input"
                    value={element}
                    id={id} />
                </tr>
            })  }



        let newObjValue
        let changeValue=(e)=> {
            newObjValue=objValue.map((element,id) => {
                if (id != e.currentTarget.id) {return element }
                else {return e.currentTarget.value}
            });

            let newRow={};
            for (let i=0; i<headerKeys.length; i++) {
                if (typeof newRow[headerKeys[i]] === 'undefined') {
                    newRow[headerKeys[i]] = newObjValue[i];
                } else {
                    if (newRow[headerKeys[i]] instanceof Array === false) {
                        newRow[headerKeys[i]] = [newRow[headerKeys[i]]];
                    }
                    newRow[headerKeys[i]].push(newObjValue[i]);
                } }
            this.setState(newRow)
        };


        return (
            <div id="fogging">
                <div id="okno">
                    <div className="taskBox">
                        <table id="table" >
                            {TableHeader()}
                        </table>
                        <table id="table">
                            {TableElement()}
                        </table>
                    </div>
                    <button className="button" onClick={()=>this.props.onDeleteDescription()}>Удалить событие</button>
                    <button className="button" onClick={()=>this.props.onSaveDescription(this.state)}>Сохранить</button>
                    <button className="button" onClick={()=>this.props.onCloseDescription()}>Закрыть</button>
                    </div>
            </div>

        );
    }
}

export default Card;

