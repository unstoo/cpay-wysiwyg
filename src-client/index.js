import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import Quill from 'quill'
import './styles.css'
import hdocsApi from './hdocs-api'

import Quill from './vendor/quill'

window.Quill = Quill
window.Delta = Quill.import('delta')
window.Parchment = Quill.import('parchment')
window.Keyboard = Quill.import('modules/keyboard')

const root = document.getElementById('root')
ReactDOM.render(<App Quill={Quill}/>, root)

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
  disableNewTableCellCreation: {
    key: 'enter',
    format: ['cell'],
    handler: function(range, context) {
      const selectedRow = document.querySelectorAll(`[data-rowid="${context.format.row}"]`)[0]
      const selectedRowBlot = Quill.find(selectedRow)
      const newCell = Parchment.create('cell')
      selectedRowBlot.insertBefore(newCell)
      debugger
    }
  },
  newTableRow: {
    key: 'enter',
    shiftKey: true,
    format: ['cell', 'row', 'tbody'],
    handler: function(range, context) {
      const tables = window.document.querySelectorAll('table')
      let selectedTable = null
      Array.prototype.forEach.call(tables, table => {
        if (table.dataset.tableid === context.format.table) {
          selectedTable = table
        } 
      })
      
      const selectedTableBlot = Quill.find(selectedTable)
      const newRow = Parchment.create('row')
      // <table><tbody> .insertBefore(newRow) inside of here </tbody><table>
      selectedTableBlot.insertBefore(newRow)
      return false
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
          ['div', (node, delta) => { if (node.getAttribute('class') === 'ql-cpay-button-container') {
            const newDelta = new Delta().retain(delta.length(), {
              buttonContainer: true
            }).insert('\n')
            return delta.compose(newDelta)
          } else {
            return delta
          } }
          ],
          ['table', (node, delta) => {
            debugger 
            return delta }
          ]
        ]
      }
    }
  })

  quill.on('text-change', function(delta, oldDelta, source) {
    if (source == 'api') {
      console.log(JSON.stringify(quill.getContents().ops, null, 2));
      
      console.log("An API call triggered this change.");
    } else if (source == 'user') {
      console.log(JSON.stringify(quill.getContents().ops, null, 2));
      console.log("A user action triggered this change.");
    }
  })
}

quillInit()
