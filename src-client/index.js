import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import Quill from 'quill'
import './styles.css'
import hdocsApi from './hdocs-api'
import Quill from './vendor/quill'


const accessKeyId = localStorage.awsid
const secretAccessKey = localStorage.awssecret
const region = "s3-eu-west-1"
const bucket = 'cpay-yev'



var S3 = require('aws-sdk/clients/s3')
// var AWS = require('aws-sdk');
// Set the region 

// AWS.config.update({credentials: { accessKeyId, secretAccessKey }});

// Create S3 service object
var s3 = new S3({
  region,
  params: {
    Bucket: bucket
  },
  apiVersion: '2006-03-01',
  endpoint: region + '.amazonaws.com',
  credentials: { accessKeyId, secretAccessKey }
})

window.s3 = s3


window.listAlbums = function listAlbums() {
  s3.listObjects({Delimiter: '/'}, function(err, data) {
    if (err) {
      // return alert('There was an error listing your albums: ' + err.message);
      console.log(err)
    } else {
      var albums = data.CommonPrefixes.map(function(commonPrefix) {
        var prefix = commonPrefix.Prefix;
        var albumName = decodeURIComponent(prefix.replace('/', ''));
        return getHtml([
          '<li>',
            '<span onclick="deleteAlbum(\'' + albumName + '\')">X</span>',
            '<span onclick="viewAlbum(\'' + albumName + '\')">',
              albumName,
            '</span>',
          '</li>'
        ]);
      });
      var message = albums.length ?
        getHtml([
          '<p>Click on an album name to view it.</p>',
          '<p>Click on the X to delete the album.</p>'
        ]) :
        '<p>You do not have any albums. Please Create album.';
      var htmlTemplate = [
        '<h2>Albums</h2>',
        message,
        '<ul>',
          getHtml(albums),
        '</ul>',
        '<button onclick="createAlbum(prompt(\'Enter Album Name:\'))">',
          'Create New Album',
        '</button>'
      ]
      document.getElementById('app').innerHTML = getHtml(htmlTemplate);
    }
  });
}

// call S3 to retrieve CORS configuration for selected bucket




// {
//   apiVersion: '2006-03-01',
//   region: 's3-eu-west-1',
//   endpoint: 'help.cryptopay.me.s3-eu-west-1.amazonaws.com',
//   params: {
//     Bucket: 'help.cryptopay.me', 
//   },
//   credentials: {
//     accessKeyId: localStorage.awsid,
//     secretAccessKey: localStorage.awssecret
//   }
// }

window.Quill = Quill
window.Delta = Quill.import('delta')
window.Parchment = Quill.import('parchment')
window.Keyboard = Quill.import('modules/keyboard')

const root = document.getElementById('root')
ReactDOM.render(<App Quill={Quill}/>, root)

var bindings = {
  lol: {
    key: 'backspace',
    format: ['link', 'buttonContainer'],
    offset: 1,
    handler: function(range, context) {
      if (context.suffix === '') {
        // A method from App.js. Since Quill.js doesn't allow to attach a keybord event listener on its html nodes.
        tooltipTerminator()
      }
      return true
    }
  },
  emptycell: {
    key: 'backspace',
    format: ['table', 'cell'],
    offset: 0,
    handler: function(range, context) {
      this.quill.setSelection({index: range.index ? range.index - 1 : range.index, length: 0})
      return
    }
  },
  newTableColumn: {
    key: 'enter',
    format: ['table'],
    handler: function(range, context) {
      // Quill.find(document.querySelectorAll(`[data-tableid="${context.format.table}"]`)[0]).addColumn()
      // const selectedRow = document.querySelectorAll(`[data-rowid="${context.format.row}"]`)[0]
      // const selectedRowBlot = Quill.find(selectedRow)
      // const newCell = Parchment.create('cell')
      // selectedRowBlot.insertBefore(newCell)
      // debugger
      this.quill.setSelection({index: range.index + 1, length: 0})
      return
    }
  },
  newTableRow: {
    key: 'enter',
    shiftKey: true,
    format: ['table'],
    handler: function(range, context) {
      // Quill.find(document.querySelectorAll(`[data-tableid="${context.format.table}"]`)[0]).addRow()
      this.quill.setSelection({index: range.index + 1, length: 0})
      return
    }
  },
  custom: {
    key: 'backspace',
    format: ['button', 'buttonContainer'],
    offset: 0,
    handler: function(range, context) {
      this.quill.format('button', false)
    }
  },
  customButtonEnter: {
    key: 'enter',
    format: ['button', 'buttonContainer'],
    handler: function(range, context) {
      this.quill.setSelection({index: range.index + 1, length: 0})
      return true
    }
  },
  customQuoteEnter: {
    key: 'enter',
    format: [ 'blockquote'],
    shiftKey: true,
    handler: function(range, context) {
      this.quill.insertText(range.index, '\n')
      return true
    }
  },
  list: {
    key: 'backspace',
    format: ['list'],
    handler: function(range, context) {
      if (context.offset === 0) {
        // When backspace on the first character of a list,
        // remove the list instead
        this.quill.format('list', false, Quill.sources.USER)
        return true
      } else {
        // Otherwise propogate to Quill's default
        return true
      }
    }
  }
}

const quillInit = () => { 
  // Set credentials and region
  // var s3 = new S3({
  //   apiVersion: '2006-03-01',
  //   region,
  //   params: {Bucket: bucket},
  //   credentials: { accessKeyId, secretAccessKey }
  // })

  // window.s3 = s3
  // console.log('___s3');
  // console.log(s3);

  

  window.quill = new Quill('#editor', {
    modules: {
      keyboard: {
        bindings: bindings
      },
      clipboard: {
        matchers: [
          ['div', (node, delta) => { if (node.getAttribute('class') === 'ql-cpay-button-container') {
            const newDelta = new Delta().retain(delta.length(), {
              buttonContainer: true
            }).insert('\n')
            return delta.compose(newDelta)
          } else {
            return delta
          } }
          ],
          ['figure', (node, delta) => { 
            
            return delta
           }
          ],
          ['table', (node, delta) => {

            // Default node -> delta table parsing yield a funny looking delta.
            // Thus custom one:
            const cells = node.querySelectorAll('td')

            const customOps = []

            // This will properly parse only table which <td> has dataset { cellid, rowid, tableid }
            // If not, it will messup the parsing process.
            Array.prototype.forEach.call(cells, cell => {
              customOps.push({
                insert: cell.innerText
              })
              
              customOps.push({
                attributes: {
                  cell: cell.dataset.cellid,
                  row: cell.dataset.rowid,
                  // a dirty hack to pass table external classes to the __table.create() method
                  table: cell.dataset.tableid +'&'
                    + cell.parentNode. // row
                    parentNode. // tbody
                    parentNode. // table
                    classList.value,
                    customCellClasses: cell.classList.value
                },
                insert: '\n'
              })
            })

            delta.ops = customOps

            // This is how a table cell delta represntation should look like:
            // {
            //   "insert": "Yevgeny"
            // },
            // {
            //   "attributes": {
            //     "cell": "1529145876725",
            //     "row": "1529145873822",
            //     "table": "1529145873814"
            //   },
            //   "insert": "\n"
            // }

            return delta 
          }
          ]
        ]
      }
    }
  })

  quill.on('text-change', function(delta, oldDelta, source) {
    if (source == 'api') {
      console.log(JSON.stringify(quill.getContents().ops, null, 2));
      
      console.log("An API call triggered this change.");
    } else if (source == 'user') {
      console.log(JSON.stringify(quill.getContents().ops, null, 2));
      console.log("A user action triggered this change.");
    }
  })
}

quillInit()
