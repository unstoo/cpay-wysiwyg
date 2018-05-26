import React from 'react'

const InlineBlotConstructor = ({ buttonName, formatName }) => {

  const applyFormat = (e, format = formatName) => {
    const appliedFormats = quill.getFormat()
    if (!appliedFormats[format]) {
        quill.format(format, true)
    } else {
        quill.format(format, false)
    }
  }

  return <button onClick={applyFormat}>
      {buttonName}
  </button>
}

export default InlineBlotConstructor
