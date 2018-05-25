import React from 'react'
import Quill from 'quill'
let Container = Quill.import('blots/container')
let Block = Quill.import('blots/block')
let Parchment = Quill.import('parchment')

class ListItem extends Block {
    constructor(domNode) {
        debugger
        super(domNode)
    }
    static formats(domNode) {
      return domNode.tagName === this.tagName ? undefined : super.formats(domNode);
    }
  
    format(name, value) {
      if (name === List.blotName && !value) {
        this.replaceWith(Parchment.create(this.statics.scope));
      } else {
        super.format(name, value);
      }
    }
  
    remove() {
    debugger
      if (this.prev == null && this.next == null) {
        this.parent.remove();
      } else {
        super.remove();
      }
    }
  
    replaceWith(name, value) {
      this.parent.isolate(this.offset(this.parent), this.length());
      if (name === this.parent.statics.blotName) {
        this.parent.replaceWith(name, value);
        return this;
      } else {
        this.parent.unwrap();
        return super.replaceWith(name, value);
      }
    }
  }
  ListItem.blotName = 'list-item';
  ListItem.tagName = 'LI';
  
  
  class List extends Container {
    static create(value) {
      let tagName = value === 'ordered' ? 'OL' : 'UL';
      let node = super.create(tagName);
      if (value === 'checked' || value === 'unchecked') {
        node.setAttribute('data-checked', value === 'checked');
      }
      return node;
    }
  
    static formats(domNode) {
      if (domNode.tagName === 'OL') return 'ordered';
      if (domNode.tagName === 'UL') {
        if (domNode.hasAttribute('data-checked')) {
          return domNode.getAttribute('data-checked') === 'true' ? 'checked' : 'unchecked';
        } else {
          return 'bullet';
        }
      }
      return undefined;
    }
  
    constructor(domNode) {
      super(domNode);
      const listEventHandler = (e) => {
        if (e.target.parentNode !== domNode) return;
        let format = this.statics.formats(domNode);
        let blot = Parchment.find(e.target);
        if (format === 'checked') {
          blot.format('list', 'unchecked');
        } else if(format === 'unchecked') {
          blot.format('list', 'checked');
        }
      }
  
      domNode.addEventListener('touchstart', listEventHandler);
      domNode.addEventListener('mousedown', listEventHandler);
    }
  
    format(name, value) {
      if (this.children.length > 0) {
        this.children.tail.format(name, value);
      }
    }
  
    formats() {
      // We don't inherit from FormatBlot
      return { [this.statics.blotName]: this.statics.formats(this.domNode) };
    }
  
    insertBefore(blot, ref) {
      if (blot instanceof ListItem) {
        super.insertBefore(blot, ref);
      } else {
        let index = ref == null ? this.length() : ref.offset(this);
        let after = this.split(index);
        after.parent.insertBefore(blot, after);
      }
    }
  
    optimize(context) {
      super.optimize(context);
      let next = this.next;
      if (next != null && next.prev === this &&
          next.statics.blotName === this.statics.blotName &&
          next.domNode.tagName === this.domNode.tagName &&
          next.domNode.getAttribute('data-checked') === this.domNode.getAttribute('data-checked')) {
        next.moveChildren(this);
        next.remove();
      }
    }
  
    replace(target) {
      if (target.statics.blotName !== this.statics.blotName) {
        let item = Parchment.create(this.statics.defaultChild);
        target.moveChildren(item);
        this.appendChild(item);
      }
      super.replace(target);
    }
  }

  List.blotName = 'list';
  List.scope = Parchment.Scope.BLOCK_BLOT;
  List.tagName = ['OL', 'UL'];
  List.defaultChild = 'list-item';
  List.allowedChildren = [ListItem];

const ListBlot = ({ blotName, tagName, formatName, optionsList }) => {
    return <button 
      onClick={(e) => {     
        
        const selectedSize = e.target.value
        const appliedFormats = quill.getFormat();
        quill.format('list', 'ul');
        
        // if (! appliedFormats.formatName || appliedFormats.formatName !== selectedSize) {
        //   quill.format(formatName, selectedSize);
        // } else {
        //     const range = quill.getSelection()
        //     quill.formatText(range.index, range.length, formatName, false)
        // }
    }}> {'list'}
        </button>
}


Quill.register(ListItem)
Quill.register(List)


export default ListBlot