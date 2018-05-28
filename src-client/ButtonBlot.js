import React from 'react'
import Quill from 'quill'
let Container = Quill.import('blots/container')
let Block = Quill.import('blots/block')
let Parchment = Quill.import('parchment')



class __button extends Block {
  static create(value) {
    let tagName = 'a'
    let node = super.create(tagName)

    node.setAttribute('href', 'https://cryptopay.me/')
    node.setAttribute('target', '_blank')
    node.setAttribute('data-tooltip', 'link')
    return node
  }

  static formats(domNode) {
    return domNode.tagName === this.tagName ? undefined : super.formats(domNode)
  }
  
  format(name, value) {
    if (name === __button.blotName && !value) {
      this.replaceWith(Parchment.create(this.statics.scope))
    } else {
      // super.format(name, value)
      this.domNode.setAttribute(name, value)
    }
  }

  remove() {
    if (this.prev == null && this.next == null) {
      this.parent.remove()
    } else {
      super.remove()
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

  getFormat(name) {
    return this.domNode.getAttribute(name)
  }
}

__button.blotName = 'button';
__button.tagName = 'a';
__button.className = `ql-cpay-button`
Quill.register(__button)
  
  
class __buttonContainer extends Container {
  static create(value) {
    let tagName = 'div'
    let node = super.create(tagName);
    return node;
  }

  format(name, value) {
    if (this.children.length > 0) {
      this.children.tail.format(name, value);
    }
  }

  formats() {
    return { buttonContainer: true }
  }

  insertBefore(blot, ref) {
      
    if (true) {
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

__buttonContainer.blotName = 'buttonContainer';
__buttonContainer.scope = Parchment.Scope.BLOCK_BLOT;
__buttonContainer.tagName = ['div', 'div'];
__buttonContainer.defaultChild = 'button';
__buttonContainer.allowedChildren = [__button];
__buttonContainer.className = 'ql-cpay-button-container'

Quill.register(__buttonContainer)


class ButtonBlot extends React.Component {

  render() {
  return <button onClick={() => { 
    let selection = quill.getSelection()
    
    if (selection.length === 0) return
      quill.insertText(selection.index + selection.length, '\n')
      quill.setSelection(selection.index, selection.length, Quill.sources.SILENT);
      quill.format('buttonContainer', true)
    }}>
    Button
    </button>
  }
}

export default ButtonBlot