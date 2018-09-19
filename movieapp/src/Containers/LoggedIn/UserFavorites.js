import React, {Component} from 'react';
import {connect} from 'react-redux';
import MovieCard from '../../Components/MovieCard/MovieCard.js';
import {Link } from 'react-router-dom';


import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import {updateFavoriteOrder} from '../../Actions/loggedInActions.js';


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


class UserFavorites extends Component{
  constructor(props){
    super();
    this.state = {
      favorites:[],
      session : true
    }
  }

  componentDidMount(){
    this.getFavoriteMovies(this.props.favorites);
  }

  getFavoriteMovies = (favorites) => {
    const token = localStorage.getItem('movieapp');
    //console.log('faavs', favorites);
    fetch('http://localhost:8080/users/user/list?favorites='+favorites,{
      method:'GET',
      headers:{
        'authorization':'bearer '+token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(r=> {
      //console.log('r', r.status);
      if(r.status===200){
        r.json()
        .then(res=>{
          //console.log(res.data);
            localStorage.setItem('movieapp', res.token);
            this.setState({
              favorites: res.data
            },()=>console.log('first', this.state.favorites))
          }
        )
      }else{
        this.setState({
          session: false
        })
      }
    })

  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const newOrder = arrayMove(this.props.favorites, oldIndex, newIndex);
    this.mapNewOrder(newOrder);
    this.props.updateFavoriteOrder(newOrder);
  };

  mapNewOrder = async (newOrder) => {
      var favs = this.state.favorites;
      var newFavoriteOrder = [];
      console.log('favs',favs);
      for(let i in newOrder){
        for(let j in favs){
          if(newOrder[i]===favs[j].id){
            newFavoriteOrder.push(favs[j]);
            break;
          }
        }
      }
    this.setState({favorites : newFavoriteOrder});
  }
  render(){
    console.log('render',this.state.favorites);
    const favs = this.state.favorites.map(people=>
      people
    )
  return (
    <div>
    <Link className='btn btn-outline-primary' path='/' exact="true" to={{
      pathname: '/user'
    }}> Back </Link>
    <div className='container'>
      <SortableList items={favs} onSortEnd={this.onSortEnd} axis='xy' />
    </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  favorites: state.user.favorites,
})

//export default UserFavorites;
export default connect(mapStateToProps, {updateFavoriteOrder} )(UserFavorites);
