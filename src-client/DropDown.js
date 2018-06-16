import React from 'react'

function toggleDisplayStyle(predicat) {
  console.log('predicat', predicat);
  
  if (predicat) {
    return { display: 'none' }
  } else {
    return { display: 'block' }
  }
}

class DropDown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedItem: this.props.initialOption,
      dropDownFolded: true
    }

    this.changeSelectedItem = this.changeSelectedItem.bind(this)
  }

  changeSelectedItem({target: { innerText: selectedItem }}) {
    this.props.notifyListener(selectedItem)
    this.setState({ selectedItem })
  }

  render() {
    const dropDownMenuItems = this.props.children.map(item => {

      if (item === this.state.selectedItem) 
        return <div><strong>{ item }</strong></div>
      else
        return <div style={{display: this.state.dropDownFolded ? 'none' : 'block'}} onClick={this.changeSelectedItem}>{ item }</div>
    })
    
    return <div  style={{
      border: '1px solid #efefef',
      padding: '2px'
    }}
    onClick={() => {
      
      console.log(this.state.dropDownFolded);
      this.setState(({ dropDownFolded }, props) => {
        return { dropDownFolded: !dropDownFolded }
      })
    }}>
      { dropDownMenuItems }
    </div>
  }
}

export default DropDown