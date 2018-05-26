import React from 'react'
import Quill from 'quill'
let Parchment = Quill.import('parchment')

let classStyle = new Parchment.Attributor.Class('size', 'cpay-ql-size', {
  scope: Parchment.Scope.INLINE,
  whitelist: []
})

Quill.register({
  ['formats/size']: classStyle
})

const StyleBlot = ({ blotName, tagName, formatName, optionsList }) => {

  const applyFormat = (e, format = formatName) => {     

    const selectedSize = e.target.value
    const appliedFormats = quill.getFormat()
    
     if (! appliedFormats.format || appliedFormats.format !== selectedSize) {
        quill.format(format, selectedSize);
    } else {
        const range = quill.getSelection()
        quill.formatText(range.index, range.length, format, false)
    }
}

  return <select onClick={applyFormat}>
      {optionsList.map(item => <option value={item} key={item}>{item}</option>)}
    </select>
}

export default StyleBlot
