import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { setConfig } from 'react-hot-loader'
import Toolbar from './Toolbar'
import ModalTooltip from './ModalTooltip'
import TooltipField from './TooltipField'
import TooltipButton from './TooltipButton'
import DocsIndex from './DocsIndex'
import CreateArticleModal from './CreateArticleModal'
setConfig({ logLevel: 'debug' })

class App extends React.Component { 
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
      categories: [],
      selectedBlot: null,
      isTooltipVisible: false,
      tooltip: { x: 0, y: 0 },
      tooltipType: false,
      isToolbarVisible: true,
      articlePreviewMode: false,
      selectedArticleTitile: '',
      selectedArticleId: '',
      showCreateArticleModal: false,
      debuggerOn: true
    }    

    this.updateBlotFormat = this.updateBlotFormat.bind(this)
    this.monitorsClicksOnTooltipableBlots = this.monitorsClicksOnTooltipableBlots.bind(this)
    this.tooltipTerminator = window.tooltipTerminator = this.tooltipTerminator.bind(this)
    this.invokeTooltip = this.invokeTooltip.bind(this)
    this.setArticleTitle = this.setArticleTitle.bind(this)
    this.createArticle = this.createArticle.bind(this)
    this.dataLoaded = this.dataLoaded.bind(this)
    this.adjustBlot = this.adjustBlot.bind(this)
  }

  componentDidMount() {
    this._asyncRequest = fetch(`https://api.helpdocs.io/v1/category?key=${localStorage.k}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(this.dataLoaded)

      this._asyncRequest = fetch(`https://api.helpdocs.io/v1/article?key=${localStorage.k}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(this.dataLoaded)
  }

  dataLoaded({categories, articles}) {
    if (articles) {
      this.setState({
        articles 
      })
    }

    if (categories) {
      this.setState({
        categories
      })
    }
  }

  monitorsClicksOnTooltipableBlots(e) {
    
    e.preventDefault()
    let aBlot = null
    let tooltipType = ''
    debugger
    if (e.target.dataset.tooltip) {
      // find a blot of a corresponding DOM node
      aBlot = Quill.find(e.target)
      tooltipType = e.target.dataset.tooltip
    } else if (e.target.parentNode.dataset.tooltip) {
      // a hack for wrapped Tooltipable blots
      aBlot = Quill.find(e.target.parentNode)
      tooltipType = e.target.parentNode.dataset.tooltip
    } else if (e.target.parentNode.parentNode.dataset.tooltip) {
      aBlot = Quill.find(e.target.parentNode.parentNode)
      tooltipType = e.target.parentNode.parentNode.dataset.tooltip
    }
    
    // Doesn't work
    e.target.addEventListener('keypress', e => { console.log('KEYPRESS EVENT') })
    
    if (aBlot && e.target.value !== '') {  
      
      this.setState({
        selectedBlot: aBlot,
        isTooltipVisible: true,
        tooltip: { x: e.pageX, y: e.pageY + 16 },
        tooltipType: tooltipType
      }) 
    } else {
        this.tooltipTerminator()
    }
  }

  tooltipTerminator() {
    this.setState({ 
      selectedBlot: null,
      isTooltipVisible: false,
      tooltip: { x: 0, y: 0 },
      tooltipType: false
    })
  }

  updateBlotFormat(name) {
    return (value) => {
      if (this.state.selectedBlot) {
        this.state.selectedBlot.format(name, value)
        this.forceUpdate()
      }
    }
  }

  adjustBlot(blotMethodName) {
    return (options = {}) => {
      console.log(this.state.selectedBlot);
      // selectedBlot
      
      if (this.state.selectedBlot) {
        console.log('this.state.selectedBlot.'+blotMethodName+'('+options+')')
        this.state.selectedBlot[blotMethodName](options)
        this.forceUpdate()
      }
    }
  }

  invokeTooltip({ tooltip, tooltipType, aBlot}) {
    this.setState({ 
      selectedBlot: aBlot,
      isTooltipVisible: true,
      tooltip,
      tooltipType
    })
  }

  setArticleTitle({ article }) {
    const { article_id, title } = article
    this.setState({
      selectedArticleTitile: title,
      selectedArticleId: article_id
    })
  }

  async createArticle(category_id, title){
    if (!category_id) {
      return console.error('category_id is missing')
    }
    //TODO: load spinner
    const data = { category_id, title }

    const response = await fetch(`https://api.helpdocs.io/v1/article?key=${localStorage.k}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

    const { article } = await response.json()

    this.setState({
      showCreateArticleModal: false,
      selectedArticleId: article.article_id,
      selectedArticleTitile: article.title
    })

    quill.clipboard.dangerouslyPasteHTML(article.body)

    //TODO: hide spinner
    
  }

  keys(e) {
    if (e.key === 'Enter') {
      const cursorPosition = (quill.getSelection())
      
      const activeFormats = (quill.getFormat())

      if (!(activeFormats.list)) {
        Object.keys(quill.removeFormat(cursorPosition))
      }
    }
  }

  render() {
    return <div className='container'>
    <div className='controls-container'>
      <div className='toggler-wrapper'>

        <button className='toggler  toggler--export-html' onClick={() => {
          const field = document.getElementById('html-code-export')
          field.value = quill.root.innerHTML
          field.select()
          document.execCommand('copy')
          field.blur()

        }}>
          Export HTML Code
        </button>
        <input type='text' id='html-code-export'/>

        <button onClick={() => {
          const pastedHTML = document.getElementById('html-code-import').value
          console.log(pastedHTML)
          quill.clipboard.dangerouslyPasteHTML(0, pastedHTML)
        }}>
          Paste HTML in
        </button>
        <input type='text' id='html-code-import'/>
      </div>

      { this.state.isToolbarVisible && <Toolbar Quill={this.props.Quill} invokeTooltip={this.invokeTooltip} /> }
    </div>
    
      <DocsIndex
        categories={this.state.categories} 
        articles={this.state.articles}
        callbackWhenArticleSelected={this.setArticleTitle}
      />
      
      <button type='button' onClick={e => {
        console.log('click');
        
        this.setState({
          showCreateArticleModal: true
        })
      }}>
        Create article
      </button>

      { this.state.showCreateArticleModal && 
        <CreateArticleModal onModalClosure={this.createArticle} categories={this.state.categories}/> }

    {/* <div id='article-title' className='article-title'>
      <h1 contentEditable='true'>{ this.state.selectedArticleTitile || 'A title'}</h1>
    </div> */}

    <div className='article-controls'>
      <button type='button' onClick={ (e => {
        
        const data = {
          title: document.getElementById('article-title').querySelectorAll('h1')[0].innerText
        }

        fetch(`https://api.helpdocs.io/v1/article/${this.state.selectedArticleId}?key=${localStorage.k}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

      }).bind(this)}>
        Save title
      </button>

      <button type='button' onClick={ (e => {
        
        const data = {
          body: quill.root.innerHTML
        }

        fetch(`https://api.helpdocs.io/v1/article/${this.state.selectedArticleId}?key=${localStorage.k}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

      }).bind(this)}>
        Save article
      </button>
    </div>
    <div id="editor" onClick={this.monitorsClicksOnTooltipableBlots} onKeyUp={this.keys}></div>
    {/* this.state = {
      articles: [],
      categories: [],
      selectedBlot: null,
      isTooltipVisible: false,
      tooltip: { x: 0, y: 0 },
      tooltipType: false,
      isToolbarVisible: true,
      articlePreviewMode: false,
      selectedArticleTitile: '',
      selectedArticleId: '',
      showCreateArticleModal: false
    }   */}
    { this.state.debuggerOn &&
      <React.Fragment>
      <table id="debugger" style={{
        position: 'fixed',
        left: '10px', bottom: '0',
        zIndex: '42',
        background: 'white'
      }}>
        <tr>
          <th>selectedBlotName</th>
          <td>{ this.state.selectedBlot ? this.state.selectedBlot.statics.blotName : this.state.selectedBlot + ''}</td>
        </tr>
        <tr>
          <th>isTooltipVisible</th><td>{this.state.isTooltipVisible + ''}</td>
        </tr>
        <tr>
          <th>tooltipType</th><td>{this.state.tooltipType + ''}</td>
        </tr>
      </table> 
      <button onClick={e => {
        const delta = JSON.parse(document.getElementById('setContents').value)
        quill.setContents(delta)
      }}>
        Set contents
      </button> 
      <textarea id='setContents'></textarea>
      <button onClick={e => {
        const delta = JSON.stringify(quill.getContents(), null, 2)
        document.getElementById('getContents').value = delta
      }}>
        Get contents
      </button> 
      <textarea id='getContents'></textarea>
      </React.Fragment>
    }
      { this.state.isTooltipVisible &&
        <ModalTooltip 
          terminator={this.tooltipTerminator} 
          position={{x: this.state.tooltip.x , y: this.state.tooltip.y}}
          type={this.state.tooltipType}>

          {this.state.tooltipType === 'image' &&
            <React.Fragment>
              <TooltipField
                parentListener={this.updateBlotFormat('width') }
                currentValue={this.state.selectedBlot.getFormat('width')}/>
              <TooltipField 
                parentListener={this.updateBlotFormat('alt')} type={'text'}
                currentValue={this.state.selectedBlot.getFormat('alt')}/>
              <TooltipButton
                parentListener={this.updateBlotFormat('margin')}
                presetValue={'LEFT'}>
                Left
              </TooltipButton>
              <TooltipButton
                parentListener={this.updateBlotFormat('margin')}
                presetValue={'CENTER'}>
                Center
              </TooltipButton>
              <TooltipButton
                parentListener={this.updateBlotFormat('margin')}
                presetValue={'RIGHT'}>
                Right
              </TooltipButton>
            </React.Fragment>

            ||

            this.state.isTooltipVisible && this.state.tooltipType === 'link' && 
              <React.Fragment>
                <TooltipField
                  parentListener={this.updateBlotFormat('href') }
                  currentValue={this.state.selectedBlot.getFormat('href')}
                  type='text'/>
              </React.Fragment> 
            
            ||
            
            this.state.tooltipType === 'table' &&
              <React.Fragment>
                Row
                <TooltipButton
                parentListener={this.adjustBlot('addRow')}>
                  +
                </TooltipButton>
                <TooltipButton
                parentListener={this.adjustBlot('removeRow')}>
                  -
                </TooltipButton>
                Col
                <TooltipButton
                parentListener={this.adjustBlot('addColumn')}>
                  +
                </TooltipButton>
                <TooltipButton
                parentListener={this.adjustBlot('removeColumn')}>
                  -
                </TooltipButton>
              </React.Fragment>
            }
          </ModalTooltip>
        }
    </div>
  }
}

export default hot(module)(App)
