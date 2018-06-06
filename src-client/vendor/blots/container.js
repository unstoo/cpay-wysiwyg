import Parchment from '../parchment/parchment';
import Block, { BlockEmbed } from './block';


class Container extends Parchment.Container { }
Container.allowedChildren = [Block, BlockEmbed, Container];


export default Container;
