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
        tooltipType: false
    }

    this.updateBlotFormat = this.updateBlotFormat.bind(this)
    this.monitorsClicksOnTooltipableBlots = this.monitorsClicksOnTooltipableBlots.bind(this)
    this.tooltipTerminator = this.tooltipTerminator.bind(this)
    this.tooltipInvoker = this.tooltipInvoker.bind(this)
  }

  monitorsClicksOnTooltipableBlots(e) {
    //check if the target have to invoke a corresponding tooltip
    if (e.target.dataset.tooltip) {
      e.preventDefault()
      const aBlot = Quill.find(e.target)

      this.setState({
          selectedBlot: aBlot,
          isTooltipVisible: true,
          tooltip: { x: e.clientX, y: e.clientY + 10 },
          tooltipType: e.target.dataset.tooltip
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
                console.log(`updateBlotFormat(name=${name}, value=${value})`)
                this.state.selectedBlot.format(name, value)
                this.forceUpdate()
            }
        }
    }

    tooltipInvoker(coordinates, tooltipType) {
        if (coordinates === false) {
            this.tooltipTerminator()
        }
    }

    render() {
        return <div className='container'>
            <Toolbar />
            <div id="editor" onClick={this.monitorsClicksOnTooltipableBlots}></div>

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
                            {'Left'}
                        </TooltipButton>
                        <TooltipButton
                            parentListener={this.updateBlotFormat('margin')}
                            position={'CENTER'}>
                            {'Center'}
                        </TooltipButton>
                        <TooltipButton
                            parentListener={this.updateBlotFormat('margin')}
                            position={'RIGHT'}>
                            {'Right'}
                        </TooltipButton>
                    </React.Fragment>

                    ||

                    this.state.isTooltipVisible && this.state.tooltipType === 'link' && 
                    <React.Fragment>
                        <TooltipField
                            parentListener={this.updateBlotFormat('href') }
                            currentValue={this.state.selectedBlot.getFormat('href')}
                            type={'text'}/>
                    </React.Fragment> }
                </ModalTooltip>
                ||
                'Tooltip hidden' }
        </div>
    }
}

export default hot(module)(App)
