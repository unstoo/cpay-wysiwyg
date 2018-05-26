import React from 'react'
import Quill from 'quill'
let Container = Quill.import('blots/container')
let Block = Quill.import('blots/block')
let Parchment = Quill.import('parchment')

const applyStyle = e => quill.format('list', 'ul')

const ListBlot = () => <button onClick={applyStyle}> {'list'} </button>

export default ListBlot
