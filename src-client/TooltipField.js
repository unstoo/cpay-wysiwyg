import React from 'react'

const TooltipField = ({ parentListener, type, currentValue }) => {

  const handler = e => void parentListener(e.target.value)
  
  return <input 
    type={ type || 'number' } 
    value={ currentValue || '' }
    onChange={ handler }
  />
}

export default TooltipField
