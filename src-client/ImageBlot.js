import React from 'react'
import Quill from 'quill'
let Embed = Quill.import('blots/block/embed')

class __imageBlot extends Embed {

    static enum_margins = {
        LEFT: '0 auto 0 0',
        RIGHT: '0 0 0 auto',
        CENTER: '0 auto'
    }

    static create(value) {
        let node = super.create()
        let attr = {}
        node.setAttribute('data-tooltip', 'image')
        attr.alt = value.alt
        node.setAttribute('alt', value.alt)
        attr.src = value.url
        node.setAttribute('src', value.url)
        attr.id = value.id
        node.setAttribute('id', value.id)

        if (!value.style) return node

        attr.style = {}
        // Parse style attribute
        let composedStyle = ''
        
        if (value.style.width) {
            attr.style.width = value.style.width
            composedStyle += `width: ${value.style.width}%;`
        }
        
        if (value.style.margin) {
            attr.style.margin = value.style.margin
            const margin = this.enum_margins[ value.style.margin.toUpperCase() ]
            composedStyle += `margin: ${margin};`
        }

        node.setAttribute('style', composedStyle)
        node.setAttribute('data-attrs', JSON.stringify(attr))            
        
        return node
      }
    
      static value(node) {
        return JSON.parse(node.getAttribute('data-attrs'))
      }

      format(name, value) {
        // update required attribute
        debugger
        const allowedStyleProps = ['width', 'margin']
        const otherAllowedAttrs = ['alt', 'src', 'id']
        const enum_margins = {
            LEFT: '0 auto 0 0',
            RIGHT: '0 0 0 auto',
            CENTER: '0 auto'
        }

        let attrs = JSON.parse(this.domNode.getAttribute('data-attrs')) 

        if (otherAllowedAttrs.includes(name)) {
            attrs[name] = value
            this.domNode.setAttribute(name, value)
        }

        if (allowedStyleProps.includes(name)) {
            attrs.style[name] = value
            
            let composedStyle = ''
           
            composedStyle += `width: ${attrs.style.width}%;`
            
            const margin = enum_margins[ attrs.style.margin.toUpperCase() ]
            composedStyle += `margin: ${margin};`
            
            
            this.domNode.setAttribute('style', composedStyle)
        } 

        this.domNode.setAttribute('data-attrs', JSON.stringify(attrs))
      }

  getFormat(name) {
    const allowedAttrs = ['width', 'margin', 'alt', 'src']
    let attrs = this.domNode.getAttribute('data-attrs')
    attrs = JSON.parse(attrs)
      
    if (allowedAttrs.includes(name) === -1) return undefined
    if (attrs[name]) return attrs[name]
    if (attrs.style[name]) return attrs.style[name]

    return undefined
  }
}

__imageBlot.blotName =    'image'
__imageBlot.tagName =     'img'
__imageBlot.className =   `ql-cpay-img`
Quill.register(__imageBlot)

const ImageBlot = ({invokeTooltip}) => {

  return <button onClick={() => {

    let width = prompt('Enter image width in %')
    const uniqueImgId = '42'
    // Взять картинку:
    // 1 линк
    // 2 локальную: загрузить в облако, подставить линк.

    let range = quill.getSelection(true)
    console.log(quill.getBounds(range.index))
    debugger
    console.log(quill.insertEmbed(range.index, 'image', {
        id: uniqueImgId,
        alt: 'Quill Cloud',
        url: 'http://v-georgia.com/wp-content/uploads/2016/03/paraplan4-858x503.jpg',
        style: {
            width,
            margin: 'right'
        }
    }, Quill.sources.USER))

    invokeTooltip({
      tooltipType: 'image',
      aBlot: Quill.find(document.getElementById('42')),
      tooltip: {
        x: 50,
        y: 50
      }
    })
    // // quill.setSelection(range.index + 1, Quill.sources.SILENT);

  }}>
    Image
  </button>
}

export default ImageBlot

