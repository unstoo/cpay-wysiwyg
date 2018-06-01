
import React from 'react'
import Quill from 'quill'
let Embed = Quill.import('blots/block/embed')

const ATTRIBUTES = [
  'height',
  'width'
]

class __videoBlot extends Embed {
  static create(value) {
    
    let node = super.create(value)

    node.setAttribute('frameborder', '0')
    node.setAttribute('allowfullscreen', true)
    // An iframe exported from Helpdocs.
    if (value.includes('www')) {
      node.setAttribute('src', 'https://'+value)
      return node
    }

    node.setAttribute('src', value.src)
    return node
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }


  static value(domNode) {
    return {
     src: domNode.getAttribute('src')
    }
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

__videoBlot.blotName = 'video';
__videoBlot.className = 'ql-video';
__videoBlot.tagName = 'IFRAME';
Quill.register(__videoBlot)

const VideoBlot = ({ blotName, tagName, formatName }) => {  

  return <button onClick={() => {

    let url = prompt('Enter youtube video link:')
    let range = quill.getSelection(true);
    url = url.split('watch?v=').join('embed/') + '?showinfo=0'
    quill.insertEmbed(range.index, 'video', {
      src: url || 'https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0',
      width: 300,
      height: 300
    }, Quill.sources.USER);

    quill.setSelection(range.index + 1, Quill.sources.SILENT);

   }}>
      <i className='material-icons'>ondemand_video</i>
  </button>

}

export default VideoBlot