import React from 'react'

const DocsIndex = ({articles, categories}) => {

const topCategories = []
const subCategories = {}
const articlesByCategory = {}

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

  return (
    <ul>
      { topCategories.map(c => {
        return <li key={ c.category_id }>
          <span><b>{ c.title }</b></span>
          <Articles articles={articlesByCategory[c.category_id]}/>
          {
            subCategories[c.category_id] &&
            <ul>
              { 
                subCategories[c.category_id].map(subC => {
                  return <li key={subC.category_id}><b>{ subC.title }</b>
                    <Articles articles={articlesByCategory[subC.category_id]}/>
                  </li>
                }) 
              }
            </ul> 
          }
        </li>
      })}
    </ul>
  )
}

const Articles = ({ articles }) => {
  if (!articles) {
    return []
  }

  return <ul>
    {articles.map(a => <li key={a.article_id}>{ a.title} 
      { a.is_published ? '__ published' : '__ draft' }
      <button onClick={() => {
        fetch(`https://api.helpdocs.io/v1/article/${a.article_id}?key=${localStorage.k}`)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
          quill.clipboard.dangerouslyPasteHTML(myJson.article.body)
        });
      }}>dl</button>
    </li>)}
  </ul>
}

export default DocsIndex
