import Quill from 'quill'
const Container = Quill.import('blots/container')
const Scroll = Quill.import('blots/scroll')
const Inline = Quill.import('blots/inline')
const Block = Quill.import('blots/block')
const Delta = Quill.import('delta')
const Parchment = Quill.import('parchment')
const BlockEmbed = Quill.import('blots/block/embed')
const TextBlot = Quill.import('blots/text')

//
//
// CONTAINER TAG
//

class ContainBlot extends Container {
  static create (value) {
    const tagName = 'contain'
    const node = super.create(tagName)
    return node
  }

  insertBefore (blot, ref) {
    if (blot.statics.blotName == this.statics.blotName) {
      console.log('############################ Not sure this is clean:')
      console.log(blot)
      console.log(blot.children.head)
      super.insertBefore(blot.children.head, ref)
    } else {
      super.insertBefore(blot, ref)
    }
  }

  static formats (domNode) {
    return domNode.tagName
  }

  formats () {
    // We don't inherit from FormatBlot
    return { [this.statics.blotName]: this.statics.formats(this.domNode) }
  }

  replace (target) {
    if (target.statics.blotName !== this.statics.blotName) {
      const item = Parchment.create(this.statics.defaultChild)
      target.moveChildren(item)
      this.appendChild(item)
    }
    if (target.parent == null) return
    super.replace(target)
  }
}

ContainBlot.blotName = 'contain'
ContainBlot.tagName = 'contain'
ContainBlot.scope = Parchment.Scope.BLOCK_BLOT
ContainBlot.defaultChild = 'block'
ContainBlot.allowedChildren = [Block, BlockEmbed, Container]
Quill.register(ContainBlot)

//
//
// CONTAINER TR
//

class TableRow extends Container {
  static create (value) {
    const tagName = 'tr'
    const node = super.create(tagName)
    node.setAttribute('row_id', value)
    return node
  }

  optimize () {
    super.optimize()
    const next = this.next
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName &&
        next.domNode.getAttribute('row_id') === this.domNode.getAttribute('row_id')) {
      next.moveChildren(this)
      next.remove()
    }
  }
}

TableRow.blotName = 'tr'
TableRow.tagName = 'tr'
TableRow.scope = Parchment.Scope.BLOCK_BLOT
TableRow.defaultChild = 'td'
Quill.register(TableRow)

//
//
// CONTAINER TABLE
//

class TableTrick {
  static random_id () {
    return Math.random().toString(36).slice(2)
  }

  static find_td (what) {
    const leaf = quill.getLeaf(quill.getSelection().index)
    let blot = leaf[0]
    for (;blot != null && blot.statics.blotName != what;) {
      blot = blot.parent
    }
    return blot // return TD or NULL
  }

  static append_col () {
    const td = TableTrick.find_td('td')
    if (td) {
      const table = td.parent.parent
      const table_id = table.domNode.getAttribute('table_id')
      td.parent.parent.children.forEach(function (tr) {
        const row_id = tr.domNode.getAttribute('row_id')
        const cell_id = TableTrick.random_id()
        const td = Parchment.create('td', table_id + '|' + row_id + '|' + cell_id)
        tr.appendChild(td)
      })
    }
  }

  static append_row () {
    const td = TableTrick.find_td('td')
    if (td) {
      const col_count = td.parent.children.length
      const table = td.parent.parent
      const new_row = td.parent.clone()
      const table_id = table.domNode.getAttribute('table_id')
      const row_id = TableTrick.random_id()
      new_row.domNode.setAttribute('row_id', row_id)
      for (var i = col_count - 1; i >= 0; i--) {
        const cell_id = TableTrick.random_id()
        const td = Parchment.create('td', table_id + '|' + row_id + '|' + cell_id)
        new_row.appendChild(td)
      };
      table.appendChild(new_row)
      console.log(new_row)
    }
  }
}

class Table extends Container {
  static create (value) {
    // special adding commands - belongs somewhere else out of constructor
    if (value == 'append-row') {
      const blot = TableTrick.append_row()
      return blot
    } else if (value == 'append-col') {
      const blot = TableTrick.append_col()
      return blot
    } else if (value.includes('newtable_')) {
      let node = null
      const sizes = value.split('_')
      const row_count = Number.parseInt(sizes[1])
      const col_count = Number.parseInt(sizes[2])
      const table_id = TableTrick.random_id()
      const table = Parchment.create('table', table_id)
      for (var ri = 0; ri < row_count; ri++) {
        const row_id = TableTrick.random_id()
        const tr = Parchment.create('tr', row_id)
        table.appendChild(tr)
        for (var ci = 0; ci < col_count; ci++) {
          const cell_id = TableTrick.random_id()
          value = table_id + '|' + row_id + '|' + cell_id
          const td = Parchment.create('td', value)
          tr.appendChild(td)
          const p = Parchment.create('block')
          td.appendChild(p)
          const br = Parchment.create('break')
          p.appendChild(br)
          node = p
        }
      }
      const leaf = quill.getLeaf(quill.getSelection().index)
      let blot = leaf[0]
      let top_branch = null
      for (;blot != null && !(blot instanceof Container || blot instanceof Scroll);) {
        top_branch = blot
        blot = blot.parent
      }
      blot.insertBefore(table, top_branch)
      return node
    } else {
      // normal table
      const tagName = 'table'
      const node = super.create(tagName)
      node.setAttribute('table_id', value)
      return node
    }
  }

  optimize () {
    console.log('OPTIMIZE start')
    super.optimize()
    const next = this.next
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName &&
        next.domNode.getAttribute('table_id') === this.domNode.getAttribute('table_id')) {
      next.moveChildren(this)
      next.remove()
    }
    console.log(quill.editor.getDelta())
    console.log('OPTIMIZE end')
  }
}

Table.blotName = 'table'
Table.tagName = 'table'
Table.scope = Parchment.Scope.BLOCK_BLOT
Table.defaultChild = 'tr'
Table.allowedChildren = [TableRow]
Quill.register(Table)

//
//
// CONTAINER TD
//

class TableCell extends ContainBlot {
  static create (value) {
    console.log(value)
    const tagName = 'td'
    const node = super.create(tagName)
    const ids = value.split('|')
    node.setAttribute('table_id', ids[0])
    node.setAttribute('row_id', ids[1])
    node.setAttribute('cell_id', ids[2])
    return node
  }

  format () {
    this.getAttribute('id')
  }

  formats () {
    // We don't inherit from FormatBlot
    return {
      [this.statics.blotName]:
      this.domNode.getAttribute('table_id') + '|' +
      this.domNode.getAttribute('row_id') + '|' +
      this.domNode.getAttribute('cell_id')
    }
  }

  optimize () {
    super.optimize()

    // Add parent TR and TABLE when missing
    const parent = this.parent
    if (parent != null && parent.statics.blotName != 'tr') {
      // we will mark td position, put in table and replace mark
      const mark = Parchment.create('block')
      this.parent.insertBefore(mark, this.next)
      const table = Parchment.create('table', this.domNode.getAttribute('table_id'))
      const tr = Parchment.create('tr', this.domNode.getAttribute('row_id'))
      table.appendChild(tr)
      tr.appendChild(this)
      table.replace(mark)
    }

    // merge same TD id
    const next = this.next
    if (next != null && next.prev === this &&
        next.statics.blotName === this.statics.blotName &&
        next.domNode.tagName === this.domNode.tagName &&
        next.domNode.getAttribute('cell_id') === this.domNode.getAttribute('cell_id')) {
      next.moveChildren(this)
      next.remove()
    }
  }
}

TableCell.blotName = 'td'
TableCell.tagName = 'td'
TableCell.scope = Parchment.Scope.BLOCK_BLOT
TableCell.defaultChild = 'block'
TableCell.allowedChildren = [Block, BlockEmbed, Container]
Quill.register(TableCell)
TableRow.allowedChildren = [TableCell]

Container.order = [
  'list', 'contain', // Must be lower
  'td', 'tr', 'table' // Must be higher
]

Quill.debug('debug')

export {
  TableTrick
}
