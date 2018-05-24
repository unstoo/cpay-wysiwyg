import React from 'react'

const TooltipField = (props) => {
    return <input 
        type={props.type || 'number' } 
        value={ props.currentValue || '' }
        onChange={(e) => {
            console.log(e.target.value);
            props.parentListener(e.target.value)
    }}/>
}

export default TooltipField