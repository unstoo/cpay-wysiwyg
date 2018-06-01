import React from 'react'

const TooltipButton = ({parentListener, position, children}) => {
  
  return <button onClick={e => void parentListener(position)}>
    { children }
  </button>
}

export default TooltipButton
