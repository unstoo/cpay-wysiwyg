import React from 'react'
// import Quill from 'quill'


class LinkBlot extends React.Component {
    constructor(props) {

      super(props)
      let Inline = Quill.import('blots/inline')

      class __linkBlot extends Inline {
        static create(value) {
          let node = super.create()

          node.setAttribute('data-tooltip', 'link')
          node.setAttribute('href', value)
          node.setAttribute('target', '_blank')
          return node;
        }

        static formats(node) {
          return node.getAttribute('href')
        }

        format(name, value) {
          if (value !== false) {
            this.domNode.setAttribute(name, value)
          } else {
            super.format(name, value)
          }

        }

        getFormat(name) {
          return this.domNode.getAttribute(name)
        }
      }

      __linkBlot.blotName = 'link'
      __linkBlot.tagName = 'a'
      __linkBlot.className = `ql-cpay-link`
      Quill.register(__linkBlot)

    }
  render() {
    return <button onClick={() => { 
      const selection = quill.getSelection()
      
      if (selection.length === 0) return
      let href = 'https://cryptopay.me'

      const appliedFormats = quill.getFormat()

      if (!appliedFormats.link) {
          quill.format('link', href)
      } else {
        debugger
          quill.format('link', false)
      }
      
    }}>
      <i className='material-icons'>insert_link</i> 
    </button>
  }
}

export default LinkBlot
