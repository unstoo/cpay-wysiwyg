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
import Table from './TableBlot'

const Toolbar = ({ invokeTooltip }) => {
  return <div className='toolbar'>
    <InlineBlot buttonName='Bold' formatName='bold' buttonIcon='format_bold' />
    <InlineBlot buttonName='Italic' formatName='italic' buttonIcon='format_italic' />
    <LinkBlot />
    <ImageBlot invokeTooltip={invokeTooltip} />
    <VideoBlot />
    <InlineBlot buttonName='Quote' formatName='blockquote' buttonIcon='format_quote' />
    <List />
    <BlockBlot buttonName='H2' formatName='header' formatValue='2' cssClass='button  button--header'/>
    <BlockBlot buttonName='H3' formatName='header' formatValue='3' cssClass='button  button--header'/>
    <ButtonBlot />
    <EmbedBlotConstructor />

    <ClearFormats />
    <FontSize />
    <TextAlign />
    <Table />
  </div>
}

export default Toolbar
