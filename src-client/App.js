import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { setConfig } from 'react-hot-loader'
import Toolbar from './Toolbar'
setConfig({ logLevel: 'debug' })


const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
    constructor(props) {
      super(props);
      this.el = document.createElement('div');
    }
  
    componentDidMount() {
      modalRoot.appendChild(this.el);
    }
  
    componentWillUnmount() {
      modalRoot.removeChild(this.el);
    }
  
    render() {
      return ReactDOM.createPortal(
        this.props.children,
        this.el,
      );
    }
  }




const Tooltip = (props) => {
    console.log(props)
    return <input type="number" onChange={(e) => {
        console.log(e.target.value);
        props.parentListener(e.target.value)
        
    }}/>
}

class App extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {selectedBlot: null}
        this.updateBlotFormat = this.updateBlotFormat.bind(this)
    }

    updateBlotFormat(value) {

        if (this.state.selectedBlot) {
            console.log('format()')
            this.state.selectedBlot.format('style', ['width: ' + (value || 100) + '%', 'margin: 0 auto'].join(';'))
        }
    }

    render() {
        return <div className='container'>
            <Toolbar />
            <div id="editor" onClick={e => {
    
                //check if the target have to invoke a corresponding tooltip
                if (e.target.dataset.tooltip) {
                    const aBlot = Quill.find(e.target)
                    console.log('Found blot with a tooltip.', aBlot);
                    
                    this.setState({selectedBlot: aBlot}) 
                    // invoke a tooltip, 
                    // const width = prompt('enter new image width in %')
                    // theBlot.format() accordingly to the tooltip input.
                    // Dismount on tooltip closure.      

                } else {
                    // no => stop
                    console.log('no tooltip');
                }
            }}></div>

            <Modal>
                <Tooltip 
                    parentListener={this.updateBlotFormat} 
                    tooltipTerminator={new Function()} />
            </Modal>
        </div>
    }
}

export default hot(module)(App)