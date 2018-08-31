import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import './MovieCards.css';
import MovieCard from '../../Components/MovieCard/MovieCard.js';

import {Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {getPopularMovies, handleFavourite, getFavouriteMovies} from '../../Actions/postActions.js';

class MovieCards extends Component{

  componentWillMount(){
    this.props.getPopularMovies('popular',1);
    this.props.getFavouriteMovies();
  }

  handlePageClick = (data) => {
    this.props.getPopularMovies(this.props.preference,data.selected+1);
  }

  handleFavourite = (movie) => {
    this.props.handleFavourite(movie, this.props.favourites);
  }

  handlePreference = (e) => {
    this.props.getPopularMovies(e.target.value, 1);
  }

  render(){
    const movies = this.props.movies;
    const r = movies? movies.map((movie, index)=>
      <MovieCard key={index} movie={movie} handleFavourite={this.handleFavourite} favourite={this.props.favourites.indexOf(movie.id)>=0}/>
    ): 'loading';

    return (
      <div>
      <Link path='/' exact="true" to={{
            pathname: '/login'
          }}> Login </Link>
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
      <div className='grid-container'>
      {r}
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  currentPage: state.movies.currentPage,
  favourites: state.movies.favourites,
  preference: state.movies.preference
})

export default connect(mapStateToProps, {getPopularMovies, handleFavourite, getFavouriteMovies} )(MovieCards);
