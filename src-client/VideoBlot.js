
import React from 'react'
import Quill from 'quill'
let Embed = Quill.import('blots/block/embed')

const ATTRIBUTES = [
  'height',
  'width'
]

class __videoBlot extends Embed {
  static create(value) {
    let node = super.create(value);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    node.setAttribute('src', value.src);
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
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

    let width = prompt('Enter image width in %')
    let range = quill.getSelection(true);

    quill.insertEmbed(range.index, 'video', {
      src: 'https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0',
      width: 300,
      height: 300
    }, Quill.sources.USER);

    // quill.setSelection(range.index + 1, Quill.sources.SILENT);

   }}>
      {'Video'}
  </button>

}

export default VideoBlot