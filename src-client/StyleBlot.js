import React from 'react'
import Quill from 'quill'
let Parchment = Quill.import('parchment')



const StyleBlot = ({ blotName, tagName, formatName, optionsList }) => {
    
    let classStyle = new Parchment.Attributor.Class('size', 'cpay-ql-size', {
      scope: Parchment.Scope.INLINE,
      whitelist: optionsList
    })

    Quill.register({
      ['formats/'+ formatName]: classStyle
    })
    
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