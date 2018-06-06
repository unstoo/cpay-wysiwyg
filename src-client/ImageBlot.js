import React from 'react'
// import Quill from 'quill'

class ImageBlot extends React.Component {
  constructor(props) {
    super(props)
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
    
        // Image came from an external source.
        if (value.includes && value.includes('http')) {
          node.setAttribute('src', value)
          attr.src = value
          let composedStyle = ''
          attr.style = {}
          attr.style.width = 100
          composedStyle += `width: 100%; height: 100%;`
          attr.style.margin = 'center'
          composedStyle += `margin: ${this.enum_margins[ 'center' ]};`
          node.setAttribute('style', composedStyle)
          node.setAttribute('data-attrs', JSON.stringify(attr))  
          return node
        }
    
        
        attr.alt = value.alt
        node.setAttribute('alt', value.alt)
        attr.src = value.src
        node.setAttribute('src', value.src)
        attr.id = value.id
        node.setAttribute('id', value.id)
    
        if (!value.style) return node
    
        attr.style = {}
        // Parse style attribute
        let composedStyle = ''
        
        if (value.style.width) {
            attr.style.width = value.style.width
            composedStyle += `width: ${value.style.width}%; height: ${value.style.width}%;`
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
        const imageAddedThroughThisApp = JSON.parse(node.getAttribute('data-attrs'))
        if (imageAddedThroughThisApp) return imageAddedThroughThisApp
        
        return {
          alt: node.getAttribute('alt'),
          src: node.getAttribute('href'),
          style: {
            margin: 'center'
          }
        }
      }
    
      format(name, value) {
        
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
          const margin = enum_margins[ attrs.style.margin.toUpperCase() ]
          
          composedStyle += `width: ${attrs.style.width}%; height:${attrs.style.width}%;`
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
        if (attrs && attrs[name]) return attrs[name]
        if (attrs && attrs.style[name]) return attrs.style[name]
    
        return undefined
      }
    }
    
    __imageBlot.blotName =    'image'
    __imageBlot.tagName =     'img'
    __imageBlot.className =   `ql-cpay-img`
    Quill.register(__imageBlot)  
  }

  render () {
  return <button onClick={() => {

    let width = prompt('Enter image width in %')
    let url = prompt('Enter image url')

    // TODO: prompt for:
    // 1. local img; ask for -> file, alt, size
    // 2. server img; ask for -> file
    // const selectImage = selectImageLocation().selectImage()

    // 1. load local img; add alt; add id; upload to bucket; wait for bucket url; return { imageAttributes }

    // 2. select image from bucket; return { imageAttributes }

    // return: { imageAttributes }
    // const imageAttributes = selectImage()

    const uniqueImgId = '42'

    let range = quill.getSelection(true)

    quill.insertEmbed(range.index, 'image', {
      id: uniqueImgId,
      alt: 'Quill Cloud',
      src: url || 'http://v-georgia.com/wp-content/uploads/2016/03/paraplan4-858x503.jpg',
      style: {
          width: width || '50',
          height: width || '50',
          margin: 'center'
      }
    }, Quill.sources.USER)

    // TODO:
    // // update BucketCatalog 
    // const BucketCatalog = {
    //   'image-url' : {
    //     'id(s?)': [],
    //     'infectedArticles': []
    //   }
    // }

    //TODO: imageAttributes.id
    const aBlot = Quill.find(document.getElementById(uniqueImgId))

    this.props.invokeTooltip({
      tooltipType: 'image',
      aBlot,
      tooltip: {
        x: aBlot.domNode.offsetLeft,
        y: aBlot.domNode.offsetTop
      }
    })
  }}>
    <i className='material-icons'>image</i>
  </button>
  }
}

export default ImageBlot
