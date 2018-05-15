import React from 'react'
import Quill from 'quill'
let Block = Quill.import('blots/block')

const BlockBlotConstructor = ({ blotName, tagName, formatName }) => {
    
    class aBlot extends Block { }
    aBlot.blotName =    blotName
    aBlot.tagName =     tagName
    aBlot.className =   `ql-cpay-${blotName || 'noclass'}`
    Quill.register(aBlot)

    return <button onClick={() => { 
        if (!(quill.getFormat())[formatName]) {
            quill.format(formatName, true);
        } else {
            const range = quill.getSelection()
            quill.formatLine(range.index, range.length, formatName, false)
        }
     }}>
        {blotName}
    </button>

}


export default BlockBlotConstructor