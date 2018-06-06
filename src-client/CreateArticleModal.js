import React from 'React'

const CreateArticleModal = ({ categories, onModalClosure }) => {
  const topCategories = []
  const subCategories = {}

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

  const style = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }

  let selectedCategoryId = topCategories[0].category_id
  let title = 'net'

  return <div style={style}>
    <label>Category of new article
    <select onChange={(e) => {
      selectedCategoryId = e.target[e.target.selectedIndex].id
      console.log(selectedCategoryId)
    }}>
      { topCategories.map(c => {
        const categoryAndItsSubCategories = []
        categoryAndItsSubCategories.push(<option key={ c.category_id } id={ c.category_id }>{ c.title }</option>)

        subCategories[c.category_id] && 
        subCategories[c.category_id].forEach(subC => {
          categoryAndItsSubCategories.push(<option key={ subC.category_id } id={ subC.category_id }>-- { subC.title }</option>)
        }) 

        return categoryAndItsSubCategories
      })}
    </select>
    </label>
    <br/>
    <label>
      New article title 
      <input type='text' onChange={(e) => {
        title = e.target.value
      }}/>
    </label>
    <br/>
    <button type='button' onClick={(e) => {
      //TODO: Filter selection of ICO, Mobile Apps Category
      onModalClosure(selectedCategoryId, title)
    }}>
      Create new article
    </button>
  </div>
}

export default CreateArticleModal
