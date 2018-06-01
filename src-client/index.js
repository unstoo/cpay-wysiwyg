import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Quill from 'quill'
import './styles.css'
import hdocsApi from './hdocs-api'

window.Quill = Quill
window.Delta = Quill.import('delta')
window.Parchment = Quill.import('parchment')
window.Keyboard = Quill.import('modules/keyboard')

const root = document.getElementById('root')
ReactDOM.render(<App />, root)


var bindings = {
  lol: {
    key: 'backspace',
    format: ['link', 'buttonContainer'],
    offset: 1,
    handler: function(range, context) {
      if (context.suffix === '') {
        // A method from App.js. Since Quill.js doesn't allow to attach a keybord event listener on its html nodes.
        tooltipTerminator()
      }
      return true
    }
  },
  custom: {
    key: 'backspace',
    format: ['button', 'buttonContainer'],
    offset: 0,
    handler: function(range, context) {
      this.quill.format('button', false)
    }
  },
  customButtonEnter: {
    key: 'enter',
    format: ['button', 'buttonContainer'],
    handler: function(range, context) {
      this.quill.setSelection({index: range.index + 1, length: 0})
      return true
    }
  },
  customQuoteEnter: {
    key: 'enter',
    format: [ 'blockquote'],
    shiftKey: true,
    handler: function(range, context) {
      this.quill.insertText(range.index, '\n')
      return true
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
        return true
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
      },
      clipboard: {
        matchers: [
          ['img', (x,y) => { return y}]
        ]
      }
    }
  })
}

  
  
  // Снимать блочные тэги (например h1, h2) при переносе строки в редакторе. Исключение - <ul>.
  // document.getElementById('editor').addEventListener('

quillInit()
