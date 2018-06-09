import React from 'react'

const applyStyle = e => quill.format('list', 'ul')

const ListBlot = () => <button onClick={ applyStyle }>
    <i className='material-icons'>format_list_bulleted</i>
  </button>

export default ListBlot
