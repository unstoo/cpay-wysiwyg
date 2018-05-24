import React from 'react'
import Quill from 'quill'
let Inline = Quill.import('blots/inline')

class __linkBlot extends Inline {
  static create(value) {
    let node = super.create()

    node.setAttribute('data-tooltip', 'link')
    node.setAttribute('href', value)
    // Okay to set other non-format related attributes
    // These are invisible to Parchment so must be static
    node.setAttribute('target', '_blank')
    return node;
  }

  static formats(node) {
    // We will only be called with a node already
    // determined to be a Link blot, so we do
    // not need to check ourselves
    return node.getAttribute('href')
  }

  format(name, value) {
    //debug
    console.log('---> debug: __linkBlot.format($name, $value)');
    console.log(name, value);
    
    //^debug
    
    this.domNode.setAttribute(name, value)
  }

  getFormat(name) {
    return this.domNode.getAttribute(name)
  }
}

__linkBlot.blotName = 'link'
__linkBlot.tagName = 'a'
__linkBlot.className = `ql-cpay-link`
Quill.register(__linkBlot)

class LinkBlot extends React.Component {
    
render() {
  return <button onClick={() => { 
      const selection = quill.getSelection()
      
      if (selection.length === 0) return
      let href = prompt('Enter link URL')
      
      const selectionCoordinates = quill.getBounds(selection.index)

      // this.props.invokeTooltip(selectionCoordinates)

      // красивый tooltip при добавлении и на ховер
      // вызов тултипа. если линк предоставлен, то quill.format('link', value = href)
      quill.format('link', href)}}>
      {'Link'}
    </button>
  }
}

export default LinkBlot