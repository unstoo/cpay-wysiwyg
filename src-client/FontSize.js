import React from 'react'
import Quill from 'quill'
let Parchment = Quill.import('parchment')

let config = new Parchment.Attributor.Class('size', 'cpay-ql-size', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['small', 'normal', 'large', 'huge']
})

let sizeAsAttribute = new Parchment.Attributor.Attribute('size', 'size', config)
let sizeAsClass = new Parchment.Attributor.Class('size', 'ql-cpay-size', config)
let sizeAsStyle = new Parchment.Attributor.Style('size', 'text-align', config)

Quill.register({
  ['formats/size']: sizeAsClass
})

class FontSize extends React.Component {
  constructor(props) {
    super(props)
    this.applyFormat = this.applyFormat.bind(this)
  }
    
   applyFormat(e, format = 'size') { 
     e.preventDefault() 
    const {value} = e.target
    const appliedFormats = quill.getFormat()

     if (! appliedFormats.format || appliedFormats.format !== value) {
        quill.format(format, value)
    } else {
        const range = quill.getSelection()
        quill.formatText(range.index, range.length, format, false)
    }
}

render () {
  const { optionsList } = this.props
  
  return <select onChange={this.applyFormat}>
      {['small', 'normal', 'large', 'huge'].map(item => <option value={item} key={item}>{item}</option>)}
    </select>
  }
}

export default FontSize
