import React from 'react'

const TooltipField = (props) => {
  const handler = e => {
    props.parentListener(e.target.value)
  }
  
  return <input 
    type={ props.type || 'number' } 
    value={ props.currentValue || '' }
    onChange={handler}/>
}

export default TooltipField
