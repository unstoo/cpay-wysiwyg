import React from 'react'
import DropDown from './DropDown'

class DocsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      areCategoryArticlesUnfolded: {},
      isDocsIndexUnfolded: false
    }

    this.toogleArticlesList = this.toogleArticlesList.bind(this)
  }

  toogleArticlesList({ target }) {
      // category_id
      const { id } = target
      this.setState((prevState, props) => {

        if (!prevState.areCategoryArticlesUnfolded[id]) {
          prevState.areCategoryArticlesUnfolded[id] = true
          return prevState
        } else {
          prevState.areCategoryArticlesUnfolded[id] = false
          return prevState
        }

      })
  }

  render() {
    const topCategories = []
    const subCategories = {}
    const articlesByCategory = {}
    const {articles, categories, callbackWhenArticleSelected} = this.props
    

    // Group articled by category id.
    articles.forEach(a => {
      if (a.category_id === '') return

      if (!articlesByCategory[a.category_id]) {
        articlesByCategory[a.category_id] = []
      }

      articlesByCategory[a.category_id].push(a)
    })  

    // Group parent categories and child categories.
    categories.forEach(c => {
      if (!c.title) return

      const parent_id = c.parent_category_id

      if (parent_id === '') { 
        topCategories.push(c)
        return
      }

      if (!subCategories[parent_id]) {
        subCategories[parent_id] = []
      }
      
      subCategories[parent_id].push(c)
    })

    const unfoldedStyle = {
      position: 'fixed',
      left: '0', right: '0', top: '80px', bottom: '0',
      zIndex: '100',
      background: 'white'
    }

    return (
      <div style={ this.state.isDocsIndexUnfolded ? unfoldedStyle : {}}>
        <button style={{width: '100%', height: '20px'}} type='button' onClick={e => {
          this.setState((prevState, props) => {
            prevState.isDocsIndexUnfolded = !prevState.isDocsIndexUnfolded
            return prevState
          })
        }}>
          Show articles
        </button>

      <ul className={'docs-index' + (this.state.isDocsIndexUnfolded ? ' docs-index--active' : '')}>
        { topCategories.map(c => {
          return <li key={ c.category_id }>
            <b><span onClick={this.toogleArticlesList} id={ c.category_id }>{ c.title }</span></b>
            <Articles
              callbackWhenArticleSelected={callbackWhenArticleSelected}
              articles={articlesByCategory[c.category_id]} 
              isUnfolded={this.state.areCategoryArticlesUnfolded[c.category_id]}
            />

            { subCategories[c.category_id] &&
              <ul>
                { subCategories[c.category_id].map(subC => {
                    return <li key={ subC.category_id }>
                      <b><span onClick={this.toogleArticlesList} id={ subC.category_id }>
                        { subC.title }
                      </span></b>
                      <Articles
                        callbackWhenArticleSelected={callbackWhenArticleSelected}
                        articles={ articlesByCategory[subC.category_id] }
                        isUnfolded = { this.state.areCategoryArticlesUnfolded[subC.category_id]}
                      />
                    </li>
                })}
              </ul> 
            }
          </li>
        })}
      </ul>
      </div>
    )
  }
}

const Articles = ({ articles, isUnfolded, callbackWhenArticleSelected }) => {

  if (!articles || !isUnfolded) return []

  return <ul>
    {articles.map(a => <li className='article-item' key={a.article_id}>
     
        <DropDown initialOption={ a.is_published ? 'published' : 'draft' } notifyListener={ async(newArticleStatus) => {
          console.log(a.article_id, newArticleStatus);

          const data = { article_id: a.article_id, is_published: newArticleStatus === 'published' ? true : false }

          const response = await fetch(`https://api.helpdocs.io/v1/article?key=${localStorage.k}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })

        const { article } = await response.json()  
        console.log(article)
        }}>
          {['draft', 'published']}
        </ DropDown>


      { a.title }

      <span onClick={(e, callback = callbackWhenArticleSelected) => {
        fetch(`https://api.helpdocs.io/v1/article/${a.article_id}?key=${localStorage.k}`)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          callbackWhenArticleSelected(myJson)
          quill.clipboard.dangerouslyPasteHTML(myJson.article.body)
        })
      }}>
        <i style={{color: '#999', cursor: 'pointer'}} className='material-icons'>cloud_download</i>
      </span>

    </li>)}
  </ul>
}

export default DocsIndex
