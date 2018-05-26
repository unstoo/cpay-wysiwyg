import React from 'react'
import InlineBlotConstructor from './InlineBlotConstructor'
import BlockBlotConstructor from './BlockBlotConstructor'
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
        <InlineBlotConstructor buttonName={'Bold'} formatName={'bold'} />
        <InlineBlotConstructor buttonName={'Italic'} formatName={'italic'} />
        <LinkBlot tooltipInvoker={props.tooltipInvoker}/>
        <ButtonBlot tooltipInvoker={props.tooltipInvoker}/>
        <BlockBlotConstructor blotName={'blockquote'} tagName={'blockquote'} formatName={'blockquote'} />
        <BlockBlotConstructor blotName={'h1'} tagName={'h1'} formatName={'h1'} />
        <BlockBlotConstructor blotName={'h2'} tagName={'h2'} formatName={'h2'} />
        <BlockBlotConstructor blotName={'h3'} tagName={'h3'} formatName={'h3'} />
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
