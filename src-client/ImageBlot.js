import React from 'react'
import Quill from 'quill'
let Embed = Quill.import('blots/block/embed')

const ImageBlot = ({ blotName, tagName, formatName }) => {
    
    class aBlot extends Embed {

        static create(value) {
            let node = super.create()
            node.setAttribute('alt', value.alt)
            node.setAttribute('src', value.url)
            return node
          }
        
          static value(node) {
            return {
              alt: node.getAttribute('alt'),
              url: node.getAttribute('src')
            }
          }
     }
    aBlot.blotName =    'image'
    aBlot.tagName =     'img'
    aBlot.className =   `ql-cpay-${blotName || 'img'}`
    Quill.register(aBlot)

    return <button onClick={() => {

        // Взять картинку:
        // 1 линк
        // 2 локальную: загрузить в облако, подставить линк.
        
        let range = quill.getSelection(true);
        quill.insertText(range.index, '\n', Quill.sources.USER);

        quill.insertEmbed(range.index + 1, 'image', {
            alt: 'Quill Cloud',
            url: 'https://quilljs.com/0.20/assets/images/cloud.png'
        }, Quill.sources.USER);

        quill.setSelection(range.index + 2, Quill.sources.SILENT);

     }}>
        {'IMG'}
    </button>

}


export default ImageBlot