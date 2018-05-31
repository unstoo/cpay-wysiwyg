import React from 'react'
import Quill from 'quill'
let Embed = Quill.import('blots/block/embed')

class __divider extends Embed { }
__divider.blotName =    'divider'
__divider.tagName =     'hr'
__divider.className =   `ql-cpay-hr`
Quill.register(__divider)

const EmbedBlotConstructor = () => {

return <button onClick={() => { 
let range = quill.getSelection(true);
quill.insertText(range.index, '\n', Quill.sources.USER);
quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
quill.setSelection(range.index + 2, Quill.sources.SILENT);
}}>
<i className='material-icons'>remove</i>
</button>
}

export default EmbedBlotConstructor
