import React, {Component} from 'react';
import MovieCard from '../../Components/MovieCard/MovieCard.js';
import {Link } from 'react-router-dom';


import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';


const SortableItem = SortableElement((movie) => {
//  console.log('movie', movie.value);
  return (
    <MovieCard key={'favorites'+movie.value.id} movie={movie.value} handleFavourite={()=>{}} favourite={true} />
  );
});

const SortableList = SortableContainer(({items}) => {
  return (
    <div className='row'>
    {items.map((value, index) => (
      <SortableItem key={'item-'+value.id} index={index} value={value} />
    ))}
    </div>
  );
});

class GuestFavorites extends Component{
  constructor(props){
    super();
    this.state = {
      favorites:[]
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('movieapp_guest');
    this.setState({
      favorites: JSON.parse(token)
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const newOrder = arrayMove(this.state.favorites, oldIndex, newIndex);
    this.setState({
      favorites: newOrder
    })

    localStorage.setItem('movieapp_guest', JSON.stringify(newOrder));
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
        <SortableList items={favs} onSortEnd={this.onSortEnd} axis='xy' />
      </div>
      </div>
    )
  }
}

//export default UserFavorites;
export default GuestFavorites;
