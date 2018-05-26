import React from 'react'
import Quill from 'quill'
let Parchment = Quill.import('parchment')

let config = {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['left', 'center', 'right']
};

let AlignAttribute = new Parchment.Attributor.Attribute('align', 'align', config);
let AlignClass = new Parchment.Attributor.Class('align', 'ql-align', config);
let AlignStyle = new Parchment.Attributor.Style('align', 'text-align', config);



const StyleBlot = ({ blotName, tagName, formatName, optionsList }) => {
    

    Quill.register({
      ['formats/align']: AlignStyle
    }, true)
    
    return <select 
      onClick={(e) => {     
        
        const selectedSize = e.target.value
        const appliedFormats = quill.getFormat();
        
         if (! appliedFormats.formatName || appliedFormats.formatName !== selectedSize) {
            quill.format(formatName, selectedSize);
        } else {
            const range = quill.getSelection()
            quill.formatText(range.index, range.length, formatName, false)
        }
    }}>
      {optionsList.map(item => <option value={item} key={item}>{item}</option>)}
        </select>
}


export default StyleBlot