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
    //debug
    console.log('---> debug: <Tooltip> props');
    console.log(props);
    
    //^debug
    
    return <input 
        type={props.type || 'number' } 
        value={ props.currentValue || '' }
        onChange={(e) => {
            console.log(e.target.value);
            props.parentListener(e.target.value)

            //close tooltip => props.tooltipTerminator()
            
    }}/>
}

class App extends React.Component { 
    constructor(props) {
        super(props)

        this.state = {
            selectedBlot: null
        }

        this.updateBlotFormat = this.updateBlotFormat.bind(this)
        this.lookForBlotsWithTooltip = this.lookForBlotsWithTooltip.bind(this)
        this.tooltipTerminator = this.tooltipTerminator.bind(this)
    }

    lookForBlotsWithTooltip(e) {
         //check if the target have to invoke a corresponding tooltip
         if (e.target.dataset.tooltip) {
            const aBlot = Quill.find(e.target)
            this.setState({selectedBlot: aBlot}) 
        }
    }

    tooltipTerminator() {
        this.setState({ selectedBlot: null })
    }

    updateBlotFormat(name) {
        return (value) => {
            if (this.state.selectedBlot) {
                console.log('updateBlotFormat')
                this.state.selectedBlot.format(name, value)
                this.forceUpdate()
            }
        }
    }

    render() {
        return <div className='container'>
            <Toolbar />
            <div id="editor" onClick={this.lookForBlotsWithTooltip}></div>

            { 
                this.state.selectedBlot !== null ?
                (<Modal>
                    <Tooltip 
                        parentListener={this.updateBlotFormat('width') }
                        currentValue={this.state.selectedBlot.getFormat('width')}
                        tooltipTerminator={new Function()} />
                    <Tooltip 
                        parentListener={this.updateBlotFormat('alt')} type={'text'}
                        currentValue={this.state.selectedBlot.getFormat('alt')}
                        tooltipTerminator={new Function()} />
                    <MarginButton
                        parentListener={this.updateBlotFormat('margin')}
                        position={'LEFT'}>
                        {'Left'}
                    </MarginButton>
                    <MarginButton
                        parentListener={this.updateBlotFormat('margin')}
                        position={'CENTER'}>
                        {'Center'}
                    </MarginButton>
                    <MarginButton
                        parentListener={this.updateBlotFormat('margin')}
                        position={'RIGHT'}>
                        {'Right'}
                    </MarginButton>
                </Modal>) 
                :'no tooltip'
            }
            
        </div>
    }
}

const MarginButton = (props) => {
    return <button
    onClick={e => {
        props.parentListener(props.position)
    }}>
        { props.children }
    </button>
}

export default hot(module)(App)