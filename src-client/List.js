import React from 'react'

const applyStyle = e => quill.format('list', 'ul')

const ListBlot = () => <button onClick={ applyStyle }> list </button>

export default ListBlot
