import React from 'react'
import Quill from 'quill'
let Block = Quill.import('blots/block')

const BlockBlotConstructor = ({ blotName, tagName }) => {
    
    class aBlot extends Block { }
    aBlot.blotName =    blotName
    aBlot.tagName =     tagName
    aBlot.className =   `ql-cpay-${blotName || 'noclass'}`
    Quill.register(aBlot)

    return <button onClick={() => { 
        window.quill.format(blotName, true) }}>
        {blotName}
    </button>

}


export default BlockBlotConstructor