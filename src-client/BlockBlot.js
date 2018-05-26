import React from 'react'
import Quill from 'quill'
let Block = Quill.import('blots/block')

const BlockBlot = ({ buttonName, formatName, formatValue }) => {
    
  const applyFormat = (e, format = formatName, value = formatValue) => { 

    const isFormatApplied = quill.getFormat()[formatName] ? true : false
    const isAppliedValueTheSame = quill.getFormat()[formatName] == value ? true : false

    if (!isFormatApplied || !isAppliedValueTheSame) {
      quill.format(formatName, value || true)
    } else {
        const range = quill.getSelection()
        quill.formatLine(range.index, range.length, format, false)
    }
 }
  
  return <button onClick={applyFormat}> {buttonName} </button>
}

export default BlockBlot
