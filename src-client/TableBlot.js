import React from 'react'
import Quill from 'quill'
let Embed = Quill.import('blots/block/embed')
let Block = Quill.import('blots/block')
let Container = Quill.import('blots/container')
let Parchment = Quill.import('parchment')

class __divider extends Embed { }
__divider.blotName =    'table'
__divider.tagName =     'table'
__divider.className =   `ql-cpay-table`
// Quill.register(__divider)



class ListItemT extends Block {
  static formats(domNode) {
    debugger
    return domNode.tagName === this.tagName ? undefined : super.formats(domNode);
  }

  format(name, value) {
    debugger
    if (name === ListT.blotName && !value) {
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
    debugger
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
ListItemT.blotName = 'list-item-tr';
ListItemT.tagName = 'TR';


class ListT extends Container {
  static create(value) {
    let node = super.create('table');
    debugger
    return node;
  }

  static formats(domNode) {
    debugger
    return undefined;
  }

  constructor(domNode) {
    debugger
    super(domNode);
  }

  format(name, value) {
    debugger
    if (this.children.length > 0) {
      this.children.tail.format(name, value);
    }
  }

  formats() {
    // We don't inherit from FormatBlot
    debugger
    return { table: true };
  }

  insertBefore(blot, ref) {
    debugger
    if (blot instanceof ListItemT) {
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

  build() {
    debugger
    super.build()
  }

  replace(target) {
    debugger
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target);
  }
}

ListT.blotName = 'table';
ListT.scope = Parchment.Scope.BLOCK_BLOT;
ListT.tagName = ['TABLE'];
ListT.defaultChild = 'list-item-tr';
ListT.allowedChildren = [ListItemT];


Quill.register(ListT)
Quill.register(ListItemT)

const Table = () => {

return <button onClick={() => { 
let range = quill.getSelection(true);
quill.insertText(range.index, '\n', Quill.sources.USER);
quill.insertEmbed(range.index + 1, 'table', true, Quill.sources.USER);
quill.setSelection(range.index + 2, Quill.sources.SILENT);
}}>
Table
</button>
}

export default Table
