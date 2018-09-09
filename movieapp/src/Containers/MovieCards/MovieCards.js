import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import './MovieCards.css';
import MovieCard from '../../Components/MovieCard/MovieCard.js';

import {Link } from 'react-router-dom';

//import {connect} from 'react-redux';
import {getPopularMovies, handleFavourite} from '../../Actions/postActions.js';

class MovieCards extends Component{
  constructor(){
    super();
    this.state = {
      movies: [],
      favorites: [],
      currentPage: 1,
      preference: 'popular'
    }

  }

  async componentDidMount(){
    console.log('mount');
    console.log(getPopularMovies(this.state.preference,this.state.currentPage));
    //this.props.getFavouriteMovies();
  }

  handlePageClick = (data) => {
    this.props.getPopularMovies(this.props.preference,data.selected+1);
  }

  handleFavourite = (movie) => {
    this.props.handleFavourite(movie);
  }

  handlePreference = (e) => {
    this.props.getPopularMovies(e.target.value, 1);
  }

  render(){
    const movies = this.props.movies;
  //  console.log(movies);
    const r = movies.length!=0? movies.map((movie, index)=>
      <MovieCard key={movie.id} movie={movie} handleFavourite={this.handleFavourite} favourite={this.props.favorites.indexOf(movie.id)>=0}/>
    ): 'loading';

    return (
      <div>
      <Link path='/' exact="true" to={{
            pathname: '/login'
          }}> Login </Link>
          <Link path='/' exact="true" to={{
                pathname: '/register'
              }}> Register </Link>

          <br/>
      <select onChange={this.handlePreference} >
          <option value='popular' >Most popular</option>
          <option value='now_playing' >Now playing</option>
          <option value='top_rated' >Top rated</option>
          <option value='upcoming' >Upcoming</option>
      </select>

      <div className='react-paginate'>
      <ReactPaginate previousLabel={"previous"}
                     nextLabel={"next"}
                     breakLabel={<a href="">...</a>}
                     breakClassName={"break-me"}
                     pageCount={9}
                     marginPagesDisplayed={2}
                     pageRangeDisplayed={5}
                     onPageChange={this.handlePageClick}
                     containerClassName={"pagination"}
                     subContainerClassName={"pages pagination"}
                     activeClassName={"active"} />
      </div>
      <div className='container'>
      <div className='row justify-content-around'>
      {r}
      </div>
      </div>
      </div>
    )
  }
}

export default MovieCards;
