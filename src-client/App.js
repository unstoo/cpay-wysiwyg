import React from 'react'
import { hot } from 'react-hot-loader'
import { setConfig } from 'react-hot-loader'
import Quill from 'quill'
import Toolbar from './Toolbar'
setConfig({ logLevel: 'debug' })

const quillInit = () => { 
    window.Quill = Quill
    window.quill = new Quill('#editor')

    
    // Снимать  блочные тэги (например h1, h2) при переносе строки в редакторе. Исключение - <blockquote>.
    document.getElementById('editor').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const cursorPosition = (quill.getSelection()).index
            
            const isItBlockquote = (quill.getFormat()).blockquote

            if (!isItBlockquote) {
                Object.keys(quill.removeFormat(cursorPosition))
            }
            
        }
    })

    window.quill.on('text-change', function(delta, oldDelta, source) {
        console.log(JSON.stringify(delta.ops, null, 2), source)
        if (source == 'api') {
          console.log("An API call triggered this change.");
        } else if (source == 'user') {
          console.log("A user action triggered this change.");
        }
      });
}



const App = () => {     
    console.log(Quill.imports)
    quillInit()
    return <div className='container'>
        <Toolbar />     
    </div>
}

export default hot(module)(App)