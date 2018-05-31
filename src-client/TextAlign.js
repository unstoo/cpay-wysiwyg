import React from 'react'
import Quill from 'quill'
let Parchment = Quill.import('parchment')

let config = {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['left', 'center', 'right']
}

let AlignAsAttribute = new Parchment.Attributor.Attribute('align', 'align', config)
let AlignAsClass = new Parchment.Attributor.Class('align', 'ql-align', config)
let AlignAsStyle = new Parchment.Attributor.Style('align', 'text-align', config)

Quill.register({
  ['formats/align']: AlignAsStyle
}, true)

const TextAlign = () => {

  const applyFormat = (e, formatName = 'align') => {     
    const selectedSize = e.target.value
    const appliedFormats = quill.getFormat();
    
    if (! appliedFormats.formatName || appliedFormats.formatName !== selectedSize) {
      quill.format(formatName, selectedSize);
    } else {
      const range = quill.getSelection()
      quill.formatText(range.index, range.length, formatName, false)
    }
  }    
    
  return <select onChange={applyFormat}>
    { 
      ['left', 'center', 'right'].map(item => <option value={item} key={item}>
        <i className='material-icons'>{`format_align_${item}`}</i>
      </option>) 
    }
  </select>
}

export default TextAlign
