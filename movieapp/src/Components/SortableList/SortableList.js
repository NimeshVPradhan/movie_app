import React, {Component} from 'react';
import MovieCard from '../MovieCard/MovieCard.js';
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';


const SortableItem = SortableElement((movie) => {
  return (
    <MovieCard key={movie.value.id} movie={movie.value} handleFavourite={()=>{}} favourite={true} />
  );
});

const SortableListRender = SortableContainer(({items}) => {
  return (
    <div className='row'>
    {items.map((value, index) => (
      <SortableItem key={'item-'+value.id} index={index} value={value} />
    ))}
    </div>
  );
});

class SortableList extends Component {

  render(){
    return  <SortableListRender items={this.props.items} onSortEnd={this.props.onSortEnd} axis='xy' />
  }
}

export default SortableList;
