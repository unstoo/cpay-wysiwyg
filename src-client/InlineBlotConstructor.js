import React from 'react'
import Quill from 'quill'
let Inline = Quill.import('blots/inline')

const InlineBlotConstructor = ({ blotName, tagName, formatName }) => {

    return <button onClick={() => {      
        const appliedFormats = quill.getFormat()
        
        if (!appliedFormats.formatName) {
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