import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './MovieCards.css';
import MovieCard from '../../Components/MovieCard/MovieCard.js';
import MovieCardHOC from '../../Components/MovieCard/MovieCardHOC.js';

import {Link } from 'react-router-dom';

import {getMovies, handleFavorite, getInitialFavoriteMovies} from '../../Actions/postActions.js';

import {SelectMenu} from '../../Components/m.js';
import Paginate from '../../Components/Pagination/Paginate.js'


class MovieCards extends Component{
  constructor(){
    super();
    this.state = {
      favorites : [],
      favoriteIDs: [],
      movies: [],
      currentPage: 1,
      preference: 'popular',
      totalPages: 10
    }
  }

  async componentDidMount(){

    const movies = await getMovies('popular',1);
    const favorites = getInitialFavoriteMovies();
    this.setState({
      favorites: favorites,
      movies: movies.results,
      totalPages: movies.total_pages
    },()=>this.setFavoriteIDs())
  }

  handlePageClick = async (data) => {
    const movies = await getMovies(this.state.preference,data.selected+1);
    //  console.log('movies', movies);
    this.setState({
      currentPage: data.selected+1,
      movies: movies.results
    })
  }

  setFavoriteIDs = () => {
    const f = this.state.favorites;
    let ids = f.map(q=> q.id);
    this.setState({
      favoriteIDs: ids
    })
  }

  handleFavorite = (movie) => {
    const f = handleFavorite(movie);
    this.setState({
      favorites: f
    },()=>this.setFavoriteIDs());
  }

  handlePreference = async(e) => {
    const preference = e.target.value;
    //  console.log(preference);
    const movies = await getMovies(preference,1);
    this.setState({
      preference: preference,
      movies: movies.results,
      totalPages: movies.total_pages
    })
  }

  verifyFavorite = (movie) => {
    const f = this.state.favorites;
    for(let i in f){
      if(movie.id===f[i].id) return true;
    }
    return false;
  }

  render(){
    return (
      <div>
        <div>
          <Link className='btn btn-success' path='/' exact="true" to={{
            pathname: '/login'
          }}> Login </Link>

          <Link className='btn btn-success' path='/' exact="true" to={{
            pathname: '/register'
          }}> Register </Link>
        </div>

        <Link className='btn btn-outline-primary' path='/' exact="true" to={{
          pathname: '/guestfavorites'
        }}> Favorites </Link>
      <br/>
        <SelectMenu onChange={this.handlePreference}/>
      <br/>
        <Paginate onPageChange={this.handlePageClick} pageCount={this.state.totalPages}/>

        <MovieCardHOC movies={this.state.movies} favorites={this.state.favoriteIDs} handleFavorite={this.handleFavorite}/>
      </div>
    )
  }
}


export default MovieCards;
