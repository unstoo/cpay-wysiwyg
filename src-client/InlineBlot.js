import React from 'react'

const InlineBlot = ({ buttonName, formatName, buttonIcon }) => {

  const applyFormat = (e, format = formatName) => {
    const appliedFormats = quill.getFormat()
    if (!appliedFormats[format]) {
        quill.format(format, true)
    } else {
        quill.format(format, false)
    }
  }

  return <button onClick={applyFormat}>
    { buttonIcon && <i className='material-icons'>{buttonIcon}</i> 
    || buttonName }
  </button>
}

export default InlineBlot
