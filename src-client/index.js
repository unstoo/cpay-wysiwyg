import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Quill from 'quill'
import './styles.css'

window.Quill = Quill
window.Delta = Quill.import('delta')
window.Parchment = Quill.import('parchment')
window.Keyboard = Quill.import('modules/keyboard')

const root = document.getElementById('root')
ReactDOM.render(<App />, root)


var bindings = {
  custom: {
    key: 'backspace',
    format: [ 'button', 'buttonContainer'],
    offset: 0,
    handler: function(range, context) {
      this.quill.format('button', false)
    }
  },
  customButtonEnter: {
    key: 'enter',
    format: [ 'button', 'buttonContainer'],
    handler: function(range, context) {
      this.quill.setSelection({index: range.index + 1, length: 0})
    }
  },
  customQuoteEnter: {
    key: 'enter',
    format: [ 'blockquote'],
    shiftKey: true,
    handler: function(range, context) {
      this.quill.insertText(range.index, '\n')
    }
  },
  list: {
    key: 'backspace',
    format: ['list'],
    handler: function(range, context) {
      if (context.offset === 0) {
        // When backspace on the first character of a list,
        // remove the list instead
        this.quill.format('list', false, Quill.sources.USER)
      } else {
        // Otherwise propogate to Quill's default
        return true
      }
    }
  }
}

const quillInit = () => { 
  window.quill = new Quill('#editor', {
    modules: {
      keyboard: {
        bindings: bindings
      }
    }
  })
  
  // Снимать блочные тэги (например h1, h2) при переносе строки в редакторе. Исключение - <ul>.
  document.getElementById('editor').addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
          const cursorPosition = (quill.getSelection()).index
          
          const activeFormats = (quill.getFormat())

          if (!(activeFormats.list)) {
              Object.keys(quill.removeFormat(cursorPosition))
          }
      }
  })
}

{
  // window.quill.on('text-change', function(delta, oldDelta, source) {
  //     console.log(JSON.stringify(delta.ops, null, 2), source)
  //     if (source == 'api') {
  //       console.log("An API call triggered this change.");
  //     } else if (source == 'user') {
  //       console.log("A user action triggered this change.");
  //     }
  // })

  // window.quill.on('selection-change', function(range, oldRange, source) {
  //     if (!range) return
  //     const selectedDelta = quill.getContents(range.index, range.length)
  //     console.log(selectedDelta);
      
  //     if (selectedDelta.ops.length === 0) return
  
  //     if (source == 'api') {
  //       console.log("API::Selection-change.", selectedDelta)
  //     } else if (source == 'user') {
  //       console.log("USER::Seclection-change", selectedDelta)
  //     }
  // })

  // const selectedDeltaIsImage = (deltaChunk) => {
  //   return deltaChunk.ops[0].insert.image
  // }
}

quillInit()