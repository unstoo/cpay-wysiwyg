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

        quill.insertEmbed(range.index, 'image', {
            alt: 'Quill Cloud',
            url: 'http://v-georgia.com/wp-content/uploads/2016/03/paraplan4-858x503.jpg'
        }, Quill.sources.USER);

        // quill.setSelection(range.index + 1, Quill.sources.SILENT);

     }}>
        {'IMG'}
    </button>

}


export default ImageBlot