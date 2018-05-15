import React from 'react'
import Quill from 'quill'

const ClearFormat = () => {

    return <button onClick={() => {
        //debug
        const selection = window.quill.getSelection()
        //debug
        console.log('---> debug: ');
        console.log(selection);
        
        //^debug
        
        console.log(window.quill.removeFormat(+selection.index, +selection.length));
        //^debug
        }}>
        {'Clear'}
    </button>

}


export default ClearFormat