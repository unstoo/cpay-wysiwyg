import React from 'react'
import Quill from 'quill'
let Inline = Quill.import('blots/inline')

const InlineBlotConstructor = ({ blotName, tagName, formatName }) => {
    
    class aBlot extends Inline { }
    aBlot.blotName = blotName
    aBlot.tagName = tagName
    aBlot.className = `ql-cpay-${blotName || 'noclass'}`
    Quill.register(aBlot)

    return <button onClick={() => {      
        
        if (!(quill.getFormat())[formatName]) {
            quill.format(formatName, true);
        } else {
            const range = quill.getSelection()
            quill.formatText(range.index, range.length, formatName, false)
        }
    }}>
        {blotName}
    </button>

}


export default InlineBlotConstructor