import React from 'react'

function NavBar(props) {
    return (
        <div onClick={()=>(props.onSwitch(props.text))}>
           <li>{props.text}</li>
        </div>
    )
}

export default NavBar
