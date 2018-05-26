import React from 'react'
import InlineBlot from './InlineBlot'
import BlockBlot from './BlockBlot'
import LinkBlot from './LinkBlot'
import ImageBlot from './ImageBlot'
import ClearFormat from './ClearFormat';
import EmbedBlotConstructor from './EmbedBlot'
import StyleBlot from './StyleBlot'
import Align from './Align'
import List from './List'
import VideoBlot from './VideoBlot'
import ButtonBlot from './ButtonBlot'



const Toolbar = (props) => {
    return <div className='toolbar'>
        <InlineBlot buttonName='Bold' formatName='bold' />
        <InlineBlot buttonName='Italic' formatName='italic' />
        <LinkBlot tooltipInvoker={props.tooltipInvoker}/>
        <ButtonBlot tooltipInvoker={props.tooltipInvoker}/>
        <InlineBlot buttonName='Quote' formatName='blockquote' />
        <BlockBlot buttonName='Header 1' formatName='header' formatValue='1' />
        <BlockBlot buttonName='Header 2' formatName='header' formatValue='2' />
        <BlockBlot buttonName='Header 3' formatName='header' formatValue='3'/>
        <EmbedBlotConstructor/>

        <ImageBlot />
        <ClearFormat />
        <StyleBlot formatName="size" optionsList={['small', 'normal', 'large', 'huge']}/>
        <Align formatName="align" optionsList={['left', 'center', 'right']}/>
        <List />
        <VideoBlot />
    </div>
}


export default Toolbar
