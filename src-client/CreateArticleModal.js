import React from 'React'

const CreateArticleModal = ({ categories, onModuleClosure }) => {
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
    justifyContent: 'center'
  }

  return <div style={style}>
    <h1>Category of new article</h1>
    <select onChange={(e) => {
      //TODO: Filter selection of ICO, Mobile Apps Category
      const selectedCategoryId = e.target[e.target.selectedIndex].id
      console.log(selectedCategoryId)
      onModuleClosure(selectedCategoryId)
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
  </div>
}

export default CreateArticleModal
