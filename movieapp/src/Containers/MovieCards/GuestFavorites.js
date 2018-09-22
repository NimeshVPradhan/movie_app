import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import SortableList from '../../Components/SortableList/SortableList.js';
import {
  arrayMove,
} from 'react-sortable-hoc';


class GuestFavorites extends Component{
  constructor(props){
    super();
    this.state = {
      favorites:[],
      open: false
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('movieapp_guest');
    this.setState({
      favorites: JSON.parse(token) || []
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const newOrder = arrayMove(this.state.favorites, oldIndex, newIndex);
//    console.log('sort end', newOrder,this.state.favorites);
    for(var i in newOrder){
      if(newOrder[i].id!==this.state.favorites[i].id){
        this.setState({
          favorites: newOrder
        })
        localStorage.setItem('movieapp_guest', JSON.stringify(newOrder));
        break;
      }
    }
    this.setState({
      open: true
    })
  };

  render(){
    const favs = this.state.favorites.map(people=>
      people
    )
    return (
      <div>
      <Link className='btn btn-outline-primary' path='/' exact="true" to={{
        pathname: '/'
      }}> Back </Link>
      <div className='container w-70'>
        {this.state.favorites.length===0?'no favorites :(':<SortableList items={favs} onSortEnd={this.onSortEnd} axis='xy' />
}
      </div>
      </div>
    )
  }
}

//export default UserFavorites;
export default GuestFavorites;
