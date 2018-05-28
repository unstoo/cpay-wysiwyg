import React from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root')

class ModalTooltip extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.state = {
      type: this.props.type
    }
  }
  
  componentDidMount() {
    modalRoot.appendChild(this.el)
  }
  
  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }
  
  render() {
    const divStyle = {
      left: this.props.position.x,
      top: this.props.position.y
    }

    return ReactDOM.createPortal(
      <div style={divStyle} className='modal-tooltip'>
          {this.props.children}
          <button type="button" onClick={this.props.terminator}>x</button>
      </div>,
      this.el)
  }
}

export default ModalTooltip
