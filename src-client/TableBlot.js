import React from 'react'
// import Quill from 'quill'

class TableBlot extends React.Component {
  constructor(props) {
    super(props)

    let Container = Quill.import('blots/container')
    let Block = Quill.import('blots/block')
    let Parchment = Quill.import('parchment')

    class __cell extends Block {
      constructor(domNode) {
          
        super(domNode)
      }

      getFormat() {
        return
      }

      static create(value) {
        const node = super.create()
        debugger
        if (typeof(value) === 'undefined') {
          node.setAttribute('data-cellid', Date.now().toString())
        } else if (typeof(value) === 'string') {
          node.setAttribute('data-cellid', value)
        } else if (typeof(value) === 'object') {
          node.setAttribute('data-cellid', value.cell || Date.now().toString())
          node.setAttribute('data-rowid', value.row || Date.now().toString())
          node.setAttribute('data-tableid', value.table || Date.now().toString())
        }

        return node
      }

      // Returns format values represented by domNode if it is this Blot's type
      // No checking that domNode is this Blot's type is required.
      static formats(domNode) { 
        return domNode.getAttribute('data-cellid')
      }

      // Return formats represented by blot, including from Attributors.
      formats() {
        return { ['cell']: this.domNode.getAttribute('data-cellid') }
      }
      
      // Apply format to blot. Should not pass onto child or other blot.  
      format(name, value) {
        
        if (name === 'row' || name === 'table') {
          this.domNode.setAttribute('data-'+name+'id', value)
        }
        super.format(name, value)
      }

      moveChildren(target) {
        if (target.statics.blotName === 'row') {
          // target === row
          // can't move children (text) out of a cell into a row
          // move self as it is instead
          
          // shadow.ts::insertInto():
          // 1 removes the __cell Blot from its current parent(the Scroll) children list
          // 2 inserts the __cell Blot into the target (__row)
          // 3 inserts the <td>...</td> into the <tr></tr>
          const cloneCell = this.clone() 
          this.moveChildren(cloneCell)
          target.appendChild(cloneCell)
          return
        } else {
          super.moveChildren(target)
        }
      }

      optimize(context) {
        // cell
        
        // const isCellInsideTable = 
        //   this.parent.parent.statics.blotName === 'table' ? true: false

        // if (!isCellInsideTable) return super.optimize()

        // const parentTable = this.parent.parent

        // parentTable.prev
        // parentTable.next

        super.optimize(context)
        
      }

      remove() {
        
        if (this.prev == null && this.next == null) {
          this.parent.remove()
        } else {
          super.remove()
        }
      }

      replaceWith(name, value) {
        
        super.replaceWith(name, value)
      }
    }

    __cell.blotName = 'cell'
    __cell.tagName = 'td'
    Quill.register(__cell)

    class __row extends Container {
      constructor(domNode) {
        super(domNode)
        this.build()
      }

      static create(value) {
        const tagName = 'tr'
        let node = super.create(tagName)
        node.setAttribute('data-rowid', value || Date.now().toString())
        return node
      }

      build() {
        super.build()
      }

      static formats(domNode) {
        return domNode.getAttribute('data-rowid')
      }

      formats() {
        return { row: this.domNode.getAttribute('data-rowid')} 
      }
    
      format(name, value) {
        super.format(name, value)
      }

      optimize(context) {
        // row
        
        if (this.next && this.next.statics.blotName === 'row' 
        && this.next.domNode.dataset.rowid === this.domNode.dataset.rowid) {
          const nextTableChildrenList = this.next.children
          // append children of the next table into this table
          // const cloneTable = this.next.clone()
          // move children to cloned
          this.next.moveChildren(this)
          this.next.remove()
        }

        super.optimize(context)
      }

      remove() {
        if (this.prev == null && this.next == null) {
          // if this __cell is the only child then remove its __row
          this.parent.remove()
        } else {
          // otherwise just remove the __cell
          super.remove()
        }
      }

      moveChildren(target) {
        if (target.statics.blotName === 'table') {
          const cloneRow = this.clone() 
          this.moveChildren(cloneRow)
          target.appendChild(cloneRow)
          return
        } else {
          super.moveChildren(target)
        }
      }

      replace(target) {
        // target -- current selection in the ql editor window
        // if (target.statics.blotName !== this.statics.blotName) {
        //   // if currently selected Blot type != 'buttonContainer'
        //   // create __button and move children from the Blot into the button
        //   let item = Parchment.create(this.statics.defaultChild);
        //   target.moveChildren(item);
        //   // append the button to the buttonContainer
        //   this.appendChild(item);
        // }
        // this === cell
        // target === row
        // this.parent === ql.editor
        // target.parent === undefined
        if (target.statics.blotName === 'cell') {
          super.replace(target)
          
        } else {
          super.replace(target)
        }
      }


      replaceWith(name, value) {
        // row
        
        this.parent.isolate(this.offset(this.parent), this.length())

        // if replacement Blot == buttonContainer
        if (name === this.parent.statics.blotName) {
          this.parent.replaceWith(name, value)
          return this;
        } else {
          // Move buttonContainer children to buttonContainer parent
          // and remove buttonContainer
          this.parent.unwrap();
          return super.replaceWith(name, value)
        }
      }
    }

    __row.blotName = 'row'
    __row.tagName = 'tr'
    __row.scope = Parchment.Scope.BLOCK_BLOT
    __row.defaultChild = 'cell'
    __row.allowedChildren = [__cell]
    Quill.register(__row)

    class __table extends Container {
      constructor(domNode, value) {
        super(domNode)
        this.build()
      }

      static create(value) {
        let node = super.create()
        node.setAttribute('data-tableid', value || Date.now().toString())
        node.setAttribute('data-tooltip', 'table')
        return node
      }

      format(name, value) {
        // Who invokes this?
        if (this.children.length > 0) {
          this.children.tail.format(name, value);
        }
      }

      formats() {
        // Invoked by getDelta at instantiation phase
        return {
            table: this.domNode.getAttribute('data-tableid')
        }
      }

      static formats(domNode) {
        return domNode.getAttribute('data-tableid')
      }

      insertBefore(blot, ref) {
        if (this.statics.allowedChildren[0].tagName === blot.domNode.tagName) {
          super.insertBefore(blot, ref)
        }
      }

      optimize(context) {
        // Super optimize ensures format('table') works
        super.optimize(context)

        if (this.next.statics.blotName === 'table' 
        && this.next.domNode.dataset.tableid === this.domNode.dataset.tableid) {
          const nextTableChildrenList = this.next.children
          // append children of the next table into this table
          // const cloneTable = this.next.clone()
          // move children to cloned
          this.next.moveChildren(this)
          this.next.remove()
        }
      }

      replace(target) {
        if (target.statics.blotName === 'cell' 
        && target.parent.statics.blotName === 'row') {
          // Don't replace the __cell with this table
          // Replace the __cell's row instead
          super.replace(target.parent)
          return
        }
        super.replace(target)
      }

      addRow(options) {
        const thisTable = this
        let { columnsCount } = thisTable.tableSize()
        const newRow = Parchment.create(thisTable.statics.defaultChild)
        const { row: rowId } = newRow.formats()
        const { table: tableId } = thisTable.formats()
        let newCell
        debugger
        while (columnsCount-->0) {
          newCell = Parchment.create(newRow.statics.defaultChild, {
            cell: '',
            row: rowId,
            table: tableId
          })
          newRow.appendChild(newCell)
        }

        thisTable.appendChild(newRow)
      }
      
      removeRow(options) {
        const { rowsCount } = this.tableSize()

        if (rowsCount === 1) return this.remove()

        // else remove last row
      }

      addColumn(options) {
        const { rowsCount } = this.tableSize()
        debugger
        let curRow = this.children.head
        let { table: tableId } = this.formats()

        let newCell
        while (curRow) {
            let { row: rowId } = curRow.formats()

            newCell = Parchment.create(curRow.statics.defaultChild, {
              cell: undefined,
              row: rowId,
              table: tableId
            })

            curRow.appendChild(newCell)
            curRow = curRow.next
        }
      }

      removeColumn(options) {
        const { columnsCount } = this.tableSize()

        if (columnsCount === 1) return this.remove()

        // else remove the last cell in each row
      }

      tableSize() {
        return {
          rowsCount: Number.parseInt(this.children.length),
          columnsCount: Number.parseInt(this.children.head.children.length)
        }
      }
    }

    __table.blotName = 'table'
    __table.tagName = 'table'
    __table.scope = Parchment.Scope.BLOCK_BLOT
    __table.defaultChild = 'row'
    __table.allowedChildren = [__row]
    __table.className = 'ql-cpay-table'
    Quill.register(__table)
  }

  render() {
    return <React.Fragment>
      <button type='button' onClick={() => { 
        let selection = quill.getSelection()

        // if (selection.length === 0) return
          quill.insertText(selection.index + selection.length, '\n')
          quill.setSelection(selection.index, selection.length, Quill.sources.SILENT);
          quill.format('table', Date.now().toString())
        }}>
        <strong>Table</strong>
      </button>
    </React.Fragment>
  }
}

export default TableBlot

 /*
    class __tbody extends Container { 
      constructor(domNode) {
        
        super(domNode)
        this.build()
      }

      static create(value) {
        
        let tagName = 'tbody'
        let node = super.create(tagName)
        return node
      }

      build() {
        
        super.build()
        // this.statics.defaultChild
      }

      static formats(domNode) {
        return 'tbody1'
      }

      formats() {
        return { tbdoy: 'tbody1' }
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

    __tbody.blotName = 'tbody';
    __tbody.tagName = 'tbody';
    __tbody.scope = Parchment.Scope.BLOCK_BLOT;
    __tbody.defaultChild = 'row';
    __tbody.allowedChildren = [__row];
    __tbody.className = 'ql-cpay-tbody'
    Quill.register(__tbody)
    /**/

    /*
    class __caption extends Block {
      constructor(domNode){
        
        super(domNode)
      }

      static create(value) {
        
        let node = super.create()
        return node
      }

      static formats(domNode) {
        return { caption: true }
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

    __caption.blotName = 'caption'
    __caption.tagName = 'caption'
    Quill.register(__caption)
  /**/