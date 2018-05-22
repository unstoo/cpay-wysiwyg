import React from 'react'
import Quill from 'quill'
let Embed = Quill.import('blots/block/embed')

const ImageBlot = ({ blotName, tagName, formatName }) => {
    
    class aBlot extends Embed {

        static create(value) {
            let node = super.create()
            node.setAttribute('alt', value.alt)
            node.setAttribute('src', value.url)
            node.setAttribute('style',
             'width: ' + (value.style || 100) + '%')
            return node
          }
        
          static value(node) {
            return {
              alt: node.getAttribute('alt'),
              url: node.getAttribute('src'),
              style: node.getAttribute('style')
            }
          }
     }
    aBlot.blotName =    'image'
    aBlot.tagName =     'img'
    aBlot.className =   `ql-cpay-${blotName || 'img'}`
    Quill.register(aBlot)

    return <button onClick={() => {

        let width = prompt('Enter image width in %')
        console.log(width);
        
        // Взять картинку:
        // 1 линк
        // 2 локальную: загрузить в облако, подставить линк.
        let range = quill.getSelection(true);

        quill.insertEmbed(range.index, 'image', {
            alt: 'Quill Cloud',
            url: 'http://v-georgia.com/wp-content/uploads/2016/03/paraplan4-858x503.jpg',
            style: width
        }, Quill.sources.USER);

        // quill.setSelection(range.index + 1, Quill.sources.SILENT);

     }}>
        {'IMG'}
    </button>

}


export default ImageBlot