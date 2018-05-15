import React from 'react'
import Quill from 'quill'
let Embed = Quill.import('blots/block/embed')

const EmbedBlotConstructor = ({ blotName, tagName, formatName }) => {
    
    class aBlot extends Embed { }
    aBlot.blotName =    'divider'
    aBlot.tagName =     'hr'
    aBlot.className =   `ql-cpay-${blotName || 'hr'}`
    Quill.register(aBlot)

    return <button onClick={() => { 
        let range = quill.getSelection(true);
        quill.insertText(range.index, '\n', Quill.sources.USER);
        quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
        quill.setSelection(range.index + 2, Quill.sources.SILENT);
     }}>
        {'-'}
    </button>

}


export default EmbedBlotConstructor