import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { setConfig } from 'react-hot-loader'
import Toolbar from './Toolbar'
import ModalTooltip from './ModalTooltip'
import TooltipField from './TooltipField'
import TooltipButton from './TooltipButton'
setConfig({ logLevel: 'debug' })

class App extends React.Component { 
  constructor(props) {
    super(props)

    this.state = {
      selectedBlot: null,
      isTooltipVisible: false,
      tooltip: { x: 0, y: 0 },
      tooltipType: false,
      isToolbarVisible: true,
      articlePreviewMode: false
    }    

    this.updateBlotFormat = this.updateBlotFormat.bind(this)
    this.monitorsClicksOnTooltipableBlots = this.monitorsClicksOnTooltipableBlots.bind(this)
    this.tooltipTerminator = window.tooltipTerminator = this.tooltipTerminator.bind(this)
    this.invokeTooltip = this.invokeTooltip.bind(this)
  }

  monitorsClicksOnTooltipableBlots(e) {
    e.preventDefault()
    let aBlot = null
    let tooltipType = ''

    if (e.target.dataset.tooltip) {
      aBlot = Quill.find(e.target)
      tooltipType = e.target.dataset.tooltip
    }
    
    if (e.target.parentNode.dataset.tooltip) {
      aBlot = Quill.find(e.target.parentNode)
      tooltipType = e.target.parentNode.dataset.tooltip
    }

    
    if (aBlot && e.target.value !== '') {
      
      e.target.addEventListener('keypress', e => { console.log(e) })
      
      this.setState({
        selectedBlot: aBlot,
        isTooltipVisible: true,
        tooltip: { x: e.clientX, y: e.clientY + 10 },
        tooltipType: tooltipType
      }) 
    } else {
        this.tooltipTerminator()
    }
  }

  tooltipTerminator() {
    this.setState({ 
      selectedBlot: null,
      isTooltipVisible: false,
      tooltip: { x: 0, y: 0 },
      tooltipType: false
    })
  }

  updateBlotFormat(name) {
    return (value) => {
      if (this.state.selectedBlot) {
        this.state.selectedBlot.format(name, value)
        this.forceUpdate()
      }
    }
  }

  invokeTooltip({ tooltip, tooltipType, aBlot}) {
   
    this.setState({ 
      selectedBlot: aBlot,
      isTooltipVisible: true,
      tooltip,
      tooltipType
    })
  }

  keys(e) {
    if (e.key === 'Enter') {
      const cursorPosition = (quill.getSelection()).index
      
      const activeFormats = (quill.getFormat())

      if (!(activeFormats.list)) {
        Object.keys(quill.removeFormat(cursorPosition))
      }
    }
  }

  render() {
    return <div className='container'>
    <div className='controls-container'>
      <div className='toggler-wrapper'>
        <button className='toggler  toggler--toolbar' onClick={new Function()}>Tbar</button>
        <button className='toggler  toggler--preview' onClick={new Function()}>Prev</button>
        <button className='toggler  toggler--export-html' onClick={() => {
          console.log(quill.root.innerHTML)
          const field = document.getElementById('html-code')
          field.value = quill.root.innerHTML
          field.select()
          document.execCommand('copy')
          field.blur()

        }}>
          Copy HTML Code
        </button>
        <input type='text' id='html-code'/>
      </div>
      { this.state.isToolbarVisible && <Toolbar invokeTooltip={this.invokeTooltip} /> }
    </div>

      <div id="editor" onClick={this.monitorsClicksOnTooltipableBlots} onKeyUp={this.keys}></div>

      { this.state.isTooltipVisible &&
        <ModalTooltip 
          terminator={this.tooltipTerminator} 
          position={{x: this.state.tooltip.x , y: this.state.tooltip.y}}
          type={this.state.tooltipType}>

          {this.state.tooltipType === 'image' &&
            <React.Fragment>
              <TooltipField
                parentListener={this.updateBlotFormat('width') }
                currentValue={this.state.selectedBlot.getFormat('width')}/>
              <TooltipField 
                parentListener={this.updateBlotFormat('alt')} type={'text'}
                currentValue={this.state.selectedBlot.getFormat('alt')}/>
              <TooltipButton
                parentListener={this.updateBlotFormat('margin')}
                position={'LEFT'}>
                Left
              </TooltipButton>
              <TooltipButton
                parentListener={this.updateBlotFormat('margin')}
                position={'CENTER'}>
                Center
              </TooltipButton>
              <TooltipButton
                parentListener={this.updateBlotFormat('margin')}
                position={'RIGHT'}>
                Right
              </TooltipButton>
            </React.Fragment>

            ||

            this.state.isTooltipVisible && this.state.tooltipType === 'link' && 
              <React.Fragment>
                <TooltipField
                  parentListener={this.updateBlotFormat('href') }
                  currentValue={this.state.selectedBlot.getFormat('href')}
                  type='text'/>
              </React.Fragment> }
          </ModalTooltip>
        }
    </div>
  }
}

export default hot(module)(App)
