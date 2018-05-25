import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Quill from 'quill'
import './styles.css'

const root = document.getElementById('root')

window.Quill = Quill
window.Delta = Quill.import('delta')
window.Parchment = Quill.import('parchment')
window.Keyboard = Quill.import('modules/keyboard')

ReactDOM.render(<App />, root)


var bindings = {
  // This will overwrite the default binding also named 'tab'
  tab: {
    key: 9,
    handler: function() {
      // Handle tab
    }
  },

  // There is no default binding named 'custom'
  // so this will be added without overwriting anything
  custom: {
    key: 'B',
    shiftKey: true,
    handler: function(range, context) {
      // Handle shift+b
      console.log(range, context);
      
    }
  },
  custom: {
    key: 'backspace',
    format: [ 'button', 'buttonContainer'],
    offset: 0,
    handler: function(range, context) {
      // Handle shift+b
      console.log(range, context);
      this.quill.format('button', false)
      
    }
  },


  list: {
    key: 'backspace',
    format: ['list'],
    handler: function(range, context) {
      if (context.offset === 0) {
        // When backspace on the first character of a list,
        // remove the list instead
        this.quill.format('list', false, Quill.sources.USER);
      } else {
        // Otherwise propogate to Quill's default
        return true;
      }
    }
  }
};


const quillInit = () => { 
  window.quill = new Quill('#editor', {
    modules: {
      keyboard: {
        bindings: bindings
      }
    }
  })

  

  quill.keyboard.addBinding({ key: 'a' }, {
    collapsed: true,
    format: ['', 'button', 'buttonContainer'],
    offset: 0
  }, function(range, context) {
    debugger
    
  });
  
  // Снимать блочные тэги (например h1, h2) при переносе строки в редакторе. Исключение - <blockquote>, <ul>.
  document.getElementById('editor').addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
          const cursorPosition = (quill.getSelection()).index
          
          const activeFormats = (quill.getFormat())

          if (!(activeFormats.blockquote || activeFormats.list)) {
              Object.keys(quill.removeFormat(cursorPosition))
          }
      }
  })

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


 
}

const selectedDeltaIsImage = (deltaChunk) => {
  return deltaChunk.ops[0].insert.image
}

quillInit()