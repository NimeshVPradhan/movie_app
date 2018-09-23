import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';
import SortableList from '../../Components/SortableList/SortableList.js';

import MovieCardModal from '../../Components/MovieCard/MovieCardModal.js';

import {
  arrayMove,
} from 'react-sortable-hoc';
import {updateFavoriteOrder} from '../../Actions/loggedInActions.js';


class UserFavorites extends Component{
  constructor(props){
    super();
    this.state = {
      favorites:[],
      session : true,
      open: false,
      modalMovie: {}

    }
  }

  componentDidMount(){
    this.getFavoriteMovies(this.props.favorites);
  }

  handleModal = () => {
    this.setState({
      open:false,
      modalMovie: {}
    })
  }


  getFavoriteMovies = (favorites) => {
    const token = localStorage.getItem('movieapp');
    fetch('/users/user/list?favorites='+favorites,{
      method:'GET',
      headers:{
        'authorization':'bearer '+token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(r=> {
      if(r.status===200){
        r.json()
        .then(res=>{
          localStorage.setItem('movieapp', res.token);
          this.setState({
            favorites: res.data
          })
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
  if(oldIndex===newIndex){
    this.setState({
      open: true,
      modalMovie: this.state.favorites[newIndex]
    })
  }
  this.mapNewOrder(newOrder, newIndex);
  this.props.updateFavoriteOrder(newOrder);
};

mapNewOrder = async (newOrder, newIndex) => {
  var favs = this.state.favorites;
  var newFavoriteOrder = [];
  for(let i in newOrder){
    for(let j in favs){
      if(newOrder[i]===favs[j].id){
        newFavoriteOrder.push(favs[j]);
        this.setState({favorites : newFavoriteOrder});
      }
    }
  }
}

handleBack = () => {
  this.props.history.push({
    pathname: '/'
  })
}

render(){
  const favs = this.state.favorites.map(people=>
    people
  )
  return (
    this.state.session?
    <div>
      <Link className='btn btn-outline-primary' path='/' exact="true" to={{
        pathname: '/user'
      }}> Back </Link>

      <div className='container'>
        {this.props.favorites.length===0?'no favorites :(': <SortableList items={favs} onSortEnd={this.onSortEnd} axis='xy' />}
      </div>

      {this.state.open? <MovieCardModal movie={this.state.modalMovie}
        handleFavorite={()=>{}}
        favorite={true}
        handleModal={this.handleModal}
        open={this.state.open} />:''}
    </div>
    :
    <div className={!this.props.session?'active':'inactive'}>
      <p>session expired</p>
      <button type='button' value='back' onClick={this.handleBack}>back</button>
    </div>

  )
}
}

const mapStateToProps = state => ({
  favorites: state.user.favorites,
})

//export default UserFavorites;
export default connect(mapStateToProps, {updateFavoriteOrder} )(UserFavorites);
