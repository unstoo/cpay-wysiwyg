import React from 'react'
import InlineBlot from './InlineBlot'
import BlockBlot from './BlockBlot'
import LinkBlot from './LinkBlot'
import ImageBlot from './ImageBlot'
import ClearFormats from './ClearFormats'
import EmbedBlotConstructor from './EmbedBlot'
import FontSize from './FontSize'
import TextAlign from './TextAlign'
import List from './List'
import VideoBlot from './VideoBlot'
import ButtonBlot from './ButtonBlot'

const Toolbar = ({invokeTooltip}) => {
  return <div className='toolbar'>
    <InlineBlot buttonName='Bold' formatName='bold' />
    <InlineBlot buttonName='Italic' formatName='italic' />
    <LinkBlot />
    <ButtonBlot />
    <InlineBlot buttonName='Quote' formatName='blockquote' />
    <BlockBlot buttonName='Header 1' formatName='header' formatValue='1' />
    <BlockBlot buttonName='Header 2' formatName='header' formatValue='2' />
    <BlockBlot buttonName='Header 3' formatName='header' formatValue='3'/>
    <EmbedBlotConstructor />

    <ImageBlot invokeTooltip={invokeTooltip} />
    <ClearFormats />
    <FontSize />
    <TextAlign />
    <List />
    <VideoBlot />
  </div>
}

export default Toolbar
