import React from 'react'

const TooltipButton = ({parentListener, presetValue, children}) => {
  
  return <button onClick={e => void parentListener(presetValue)}>
    { children }
  </button>
}

export default TooltipButton
