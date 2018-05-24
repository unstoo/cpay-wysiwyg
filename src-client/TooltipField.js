import React from 'react'

const TooltipField = (props) => {
    //debug
    console.log('---> debug: TooltipField($props)');
    console.log(props);
    
    //^debug
    
    return <input 
        type={ props.type || 'number' } 
        value={ props.currentValue || '' }
        onChange={(e) => {
            console.log(e.target.value);
            props.parentListener(e.target.value)
    }}/>
}

export default TooltipField