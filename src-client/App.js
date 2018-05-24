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
            isTooltipVisible: false
        }

        this.updateBlotFormat = this.updateBlotFormat.bind(this)
        this.lookForBlotsWithTooltip = this.lookForBlotsWithTooltip.bind(this)
        this.tooltipTerminator = this.tooltipTerminator.bind(this)
    }

    lookForBlotsWithTooltip(e) {
         //check if the target have to invoke a corresponding tooltip
         if (e.target.dataset.tooltip) {
            const aBlot = Quill.find(e.target)
            this.setState({
                selectedBlot: aBlot,
                isTooltipVisible: true
            }) 
        } else {
            this.tooltipTerminator()
        }
    }

    tooltipTerminator() {
        this.setState({ 
            selectedBlot: null,
            isTooltipVisible: false
         })
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

            { this.state.isTooltipVisible &&
                (<ModalTooltip terminator={this.tooltipTerminator} position={{x: 150, y: 150}}>
                    <TooltipField
                        parentListener={this.updateBlotFormat('width') }
                        currentValue={this.state.selectedBlot.getFormat('width')}
                        tooltipTerminator={new Function()} />
                    <TooltipField 
                        parentListener={this.updateBlotFormat('alt')} type={'text'}
                        currentValue={this.state.selectedBlot.getFormat('alt')}
                        tooltipTerminator={new Function()} />
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
                </ModalTooltip>) 
                || 'Tooltip hidden' }
        </div>
    }
}

export default hot(module)(App)
