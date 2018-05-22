import React from 'react'
import Quill from 'quill'

const List = ({ blotName, tagName, formatName, optionsList }) => {
    

    
    
    return <button 
      onClick={(e) => {     
        
        const selectedSize = e.target.value
        const appliedFormats = quill.getFormat();
        quill.format('list', 'ul');
        
        // if (! appliedFormats.formatName || appliedFormats.formatName !== selectedSize) {
        //   quill.format(formatName, selectedSize);
        // } else {
        //     const range = quill.getSelection()
        //     quill.formatText(range.index, range.length, formatName, false)
        // }
    }}> {'list'}
        </button>
}


export default List