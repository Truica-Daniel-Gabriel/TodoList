import React,{useState} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';


const ToDoItem = (props) => {
    const [styleUp, setStyle] = useState(false)
    function text() {
       setStyle(prevValue=>(!prevValue))
    }
    return (
        <div className="btli">
        {/* Uppdate waiting  */}
            <li className="CheckItem" style={{textDecoration: styleUp? "line-through": null}} 
            onClick={text}>
            <DeleteIcon 
            className="trashicon"
             onClick={()=>{
              props.onChacked(props.id)
              setStyle(prevValue=>(!prevValue))
            }
                 
            }/>{props.text}</li>
        </div>        
    )
}

export default ToDoItem
