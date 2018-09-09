import React, {Component} from 'react';
import {connect} from 'react-redux';
import MovieCard from '../../Components/MovieCard/MovieCard.js';

class UserFavorites extends Component{
  constructor(props){
    super();
    this.state = {
      favorites:[]
    }
  }

  componentDidMount(){
    const token = localStorage.getItem('movieapp');
    console.log('mounted', this.props.favorites);
    fetch('http://localhost:8080/users/user/list?favorites='+this.props.favorites,{
      method:'GET',
      headers:{
        'authorization':'bearer '+token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(r=> {
      console.log('r', r.status);
      if(r.status===200){
        r.json()
        .then(res=>{
            localStorage.setItem('movieapp', res.token);
            this.setState({
              favorites: res.data
            })
          }
        )
      }
    })
  }

  render(){
    console.log('render',this.state.favorites);
    const favoriteRender = this.state.favorites.length==0?'no favorites :(': this.state.favorites.map(movie=>{
      return <MovieCard key={'favorites'+movie.id} movie={movie} handleFavourite={()=>{}} favourite={true} />
    });
  return (
      <div className='row'>
      {favoriteRender}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  favorites: state.user.favorites,
})

//export default UserFavorites;
export default connect(mapStateToProps, null )(UserFavorites);
