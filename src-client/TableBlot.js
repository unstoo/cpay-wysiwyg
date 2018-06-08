import React from 'react'
// import Quill from 'quill'

class TableBlot extends React.Component {
  constructor(props) {
    super(props)

    let Container = Quill.import('blots/container')
    let Block = Quill.import('blots/block')
    let Parchment = Quill.import('parchment')

    class __cell extends Block {
      constructor(domNode){
        debugger
        super(domNode)
      }

      static create(value) {
        debugger
        let node = super.create()
        return node
      }

      static formats(domNode) {
        return domNode.tagName === this.tagName ? undefined : super.formats(domNode)
      }
      
      format(name, value) {
        if (name === __cell.blotName && value === false) {
          // replace __button with <p>
          // perserving children if any
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
        // on Button deletion

        this.parent.isolate(this.offset(this.parent), this.length());

        // if replacement Blot == buttonContainer
        if (name === this.parent.statics.blotName) {
          this.parent.replaceWith(name, value);
          return this;
        } else {
          // Move buttonContainer children to buttonContainer parent
          // and remove buttonContainer
          this.parent.unwrap();
          return super.replaceWith(name, value);
        }
      }

      getFormat(name) {
        return this.domNode.getAttribute(name)
      }
    }

    __cell.blotName = 'cell'
    __cell.tagName = ['td', 'th']
    Quill.register(__cell)

    class __row extends Container {
      constructor(domNode) {
        debugger
        super(domNode)
        this.build()
      }

      static create(value) {
        debugger
        let tagName = 'tr'
        let node = super.create(tagName)
        return node
      }

      build() {
        debugger
        super.build()
        // this.statics.defaultChild
      }

      static formats(domNode) {
        debugger
        return domNode.tagName === this.tagName ? undefined : super.formats(domNode)
      }
    
      format(name, value) {
        if (name === __row.blotName && value === false) {
          // replace __button with <p>
          // perserving children if any
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

      replace(target) {
      debugger
        // target -- current selection in the ql editor window
        if (target.statics.blotName !== this.statics.blotName) {
          // if currently selected Blot type != 'buttonContainer'
          // create __button and move children from the Blot into the button
          let item = Parchment.create(this.statics.defaultChild);
          let item2 = Parchment.create(this.statics.defaultChild);
          target.moveChildren(item);
          // append the button to the buttonContainer
          this.appendChild(item);
          this.appendChild(item2);
        }
    
    
        super.replace(target);
      }


      replaceWith(name, value) {å
        // on Button deletion

        this.parent.isolate(this.offset(this.parent), this.length());

        // if replacement Blot == buttonContainer
        if (name === this.parent.statics.blotName) {
          this.parent.replaceWith(name, value);
          return this;
        } else {
          // Move buttonContainer children to buttonContainer parent
          // and remove buttonContainer
          this.parent.unwrap();
          return super.replaceWith(name, value);
        }
      }

      getFormat(name) {
        return this.domNode.getAttribute(name)
      }
    }

    __row.blotName = 'row';
    __row.tagName = 'tr';
    __row.scope = Parchment.Scope.BLOCK_BLOT;
    __row.defaultChild = 'cell';
    __row.allowedChildren = [__cell];
    Quill.register(__row)
  
  class __table extends Container {
    constructor(domNode, value) {
      debugger
      super(domNode)
      this.build()
    }

    static create(value) {
      debugger
      let node = super.create();

      let row1 = document.createElement('tr')
      let row2 = document.createElement('tr')

      let cell11 = document.createElement('td')
      let cell12 = document.createElement('td')
      row1.appendChild(cell11)
      row1.appendChild(cell12)

      let cell21 = document.createElement('td')
      let cell22 = document.createElement('td')
      row2.appendChild(cell21)
      row2.appendChild(cell22)

      node.appendChild(row1)
      node.appendChild(row2)
      return node;
    }

    format(name, value) {
      if (this.children.length > 0) {
        this.children.tail.format(name, value);
      }
    }

    formats() {
      debugger
      return { table: true }
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
      // super.optimize(context) will Registry.create(this.statics.defaultChild:[row])
      // this.appendChild(child)
      // child.optimize(context)
      // TODO: pass number of cells in row
      // TODO: pass number of rows
      super.optimize(context);
      let next = this.next;
      // if (next != null && next.prev === this &&
      //     next.statics.blotName === this.statics.blotName &&
      //     next.domNode.tagName === this.domNode.tagName &&
      //     next.domNode.getAttribute('data-checked') === this.domNode.getAttribute('data-checked')) {
      //   next.moveChildren(this);
      //   next.remove();
      // }
    }

    replace(target) {
      
      // target -- current selection in the ql editor window
      if (target.statics.blotName !== this.statics.blotName) {
        // if currently selected Blot type != 'buttonContainer'
        // create __button and move children from the Blot into the button
        let item = Parchment.create(this.statics.defaultChild);
        target.moveChildren(item);
        // append the button to the buttonContainer
        this.appendChild(item);
      }


      super.replace(target);
    }
  }

    __table.blotName = 'table';
    __table.tagName = 'table';
    __table.scope = Parchment.Scope.BLOCK_BLOT;
    __table.defaultChild = 'row';
    __table.allowedChildren = [__row];
    __table.className = 'ql-cpay-table'
    Quill.register(__table)
  }

  render() {
    return <button onClick={() => { 
      let selection = quill.getSelection()

      // if (selection.length === 0) return
        // quill.insertText(selection.index + selection.length, '\n')
        // quill.setSelection(selection.index, selection.length, Quill.sources.SILENT);
        quill.insertEmbed(0, 'table', [2,2])
      }}>
      <strong>Table</strong>
      </button>
  }
}

export default TableBlot