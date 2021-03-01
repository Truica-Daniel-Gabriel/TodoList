import React, {useState, useEffect} from 'react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import ToDoItem from './ToDoItem';
import week from './week'
import NavBar from './NavBar';

function App() {
  const urlAddItems="https://todosv.herokuapp.com/AddItems";
  const [text, setText]=useState("");
  const [items, setItems]=useState([]);
  const [switchweek ,setweek]=useState(week);
  const days =["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  useEffect(() => {
    fetch("https://todosv.herokuapp.com/Data",{
      method: "post",
      headers: {
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        day : switchweek
      })
    })
    .then(response => response.json())
    .then(res=>{
      // console.log(res);
       for(let i=0;i<res.length;i++){
         const {name}=res[i]
         setItems((prevItems)=>{
           return [...prevItems, name]
         })
       }
    })
    .catch((err)=>console.log(err))
    console.log("stateCall");
  }, [switchweek])
  function handleClick() {
   setItems((prevItem)=>{
     return [...prevItem, text];
   });
   fetch(urlAddItems,{
     method: "post",
     headers: {
      'Content-type':'application/json'
    },
    body:JSON.stringify({
      Item : text
    })

   })
   .then(response => response.json())
   .then(()=>(console.log("Succes send")))
   .catch((err)=>console.log(err))
   setText("");
  }
  function handleChange(event) {
    const newVal=event.target.value;
    setText(newVal);
  }
  function deleteItem(id) {
    setItems((prevItem)=>(
       prevItem.filter((val, index)=>{
        if(id!=index){
          return val;
        }else{
          fetch(urlAddItems,{
            method:"delete",
            headers: {
              'Content-type':'application/json'
            },
            body:JSON.stringify({
              Item : val
            })
          })
          .then(response => response.json())
          .then(()=>(console.log("Succes send")))
          .catch((err)=>console.log(err))
        }
       })
    ));
  }
  const Switch = (Name)=>{
   setItems([]);
   setweek(Name);
  }
  console.log(switchweek);

  return (
     <div>
     <div className="Navbar">
       <ul>
       {
         days.map((val,index)=>(
         <NavBar
          key={index}
          text={val}
          onSwitch={Switch}
         />
         ))
       }
        </ul>
      </div>
       
     <div className="container">
      <div className="title">
        <h1>{switchweek}</h1>
      </div>
      <div className="Forms">
        <input  onChange={handleChange} placeholder="Place text" value={text} type="text"/>
        <Fab onClick={handleClick}>
        <AddIcon id="bt"/>
        </Fab>
      </div>
        <ul>
          {items.map((val, index)=> (
            <ToDoItem
              key={index}
              id={index}
              text={val}
              onChacked={deleteItem}
            />
          ))}
         
          
        </ul>
        
      
    </div>
  </div>
    
  )
}

export default App
