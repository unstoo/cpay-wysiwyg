import React from 'react'
import Quill from 'quill'

const clearFormats = () => {
  const selection = window.quill.getSelection()
  quill.removeFormat(selection.index, selection.length)
}

const ClearFormats = () => <button onClick={clearFormats}> {'Clear'} </button>

export default ClearFormats
