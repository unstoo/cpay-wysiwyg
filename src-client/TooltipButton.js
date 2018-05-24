import React from 'react'

const TooltipButton = (props) => {
  return <button
  onClick={e => {
      props.parentListener(props.position)
  }}>
      { props.children }
  </button>
}

export default TooltipButton