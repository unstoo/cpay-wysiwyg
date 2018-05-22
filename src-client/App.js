import React from 'react'
import { hot } from 'react-hot-loader'
import { setConfig } from 'react-hot-loader'
import Quill from 'quill'
import Toolbar from './Toolbar'
setConfig({ logLevel: 'debug' })



const quillInit = () => { 
    window.Quill = Quill
    window.quill = new Quill('#editor')
    window.Delta = Quill.import('delta')
    
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

    window.quill.on('text-change', function(delta, oldDelta, source) {
        console.log(JSON.stringify(delta.ops, null, 2), source)
        if (source == 'api') {
          console.log("An API call triggered this change.");
        } else if (source == 'user') {
          console.log("A user action triggered this change.");
        }
    })


    window.quill.on('selection-change', function(range, oldRange, source) {
        const selectedDelta = quill.getContents(range.index, range.length)
        console.log(selectedDelta);
        
        if (selectedDelta.ops.length === 0) return

        if (source == 'api') {
          console.log("API::Selection-change.", selectedDelta)
        } else if (source == 'user') {
          console.log("USER::Seclection-change", selectedDelta)
          
          const ifImage = selectedDeltaIsImage(selectedDelta)
          if (ifImage) {
            let newWidth = window.prompt('Enter image width in %')

            quill.updateContents(
                new Delta()
                .retain(range.index)
                .delete(1)
                .insert({ image: { url: ifImage.url, alt: ifImage.alt, style: newWidth }})
            )
          } 
        }
    })
}

const selectedDeltaIsImage = (deltaChunk) => {
    return deltaChunk.ops[0].insert.image
}

const App = () => {     
    console.log(Quill.imports)
    quillInit()
    return <div className='container'>
        <Toolbar />     
    </div>
}

export default hot(module)(App)