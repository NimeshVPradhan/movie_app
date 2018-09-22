import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './MovieCards.css';
import MovieCard from '../../Components/MovieCard/MovieCard.js';

import {Link } from 'react-router-dom';

import {getMovies, handleFavourite, getInitialFavouriteMovies} from '../../Actions/postActions.js';

import {SelectMenu} from '../../Components/m.js';
import Paginate from '../../Components/Pagination/Paginate.js'


class MovieCards extends Component{
  constructor(){
    super();
    this.state = {
      favorites : [],
      movies: [],
      currentPage: 1,
      preference: 'popular',
      totalPages: 10
    }
  }

  async componentDidMount(){

    const movies = await getMovies('popular',1);
    const favorites = getInitialFavouriteMovies();
    this.setState({
        favorites: favorites,
        movies: movies.results,
        totalPages: movies.total_pages
    })
  }

  handlePageClick = async (data) => {
    const movies = await getMovies(this.state.preference,data.selected+1);
    console.log('movies', movies);
    this.setState({
        currentPage: data.selected+1,
        movies: movies.results
      })
  }

  handleFavorite = (movie) => {
    const f = handleFavourite(movie);
    this.setState({
      favorites: f
    })
  }

  handlePreference = async(e) => {
    const preference = e.target.value;
    console.log(preference);
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
    const movies = this.state.movies;
    //console.log('render', this.state);
    const r = movies? movies.map((movie, index)=>
      <MovieCard key={'guest_'+movie.id} movie={movie} handleFavorite={this.handleFavorite} favourite={this.verifyFavorite(movie)}/>
    ): 'loading';

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
      <div className='container'>
      <div className='row'>
      {r}
      </div>
      </div>
      </div>
    )
  }
}


export default MovieCards;
