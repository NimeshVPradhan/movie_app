import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import './LoggedInUser.css';
import MovieCard from '../../Components/MovieCard/MovieCard.js';

import {Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {getPopularMovies, handleFavourite,getFavouriteMovies} from '../../Actions/userActions.js';

class LoggedInUser extends Component{

  componentWillMount(){
    this.props.getPopularMovies('popular',1);
    this.props.getFavouriteMovies(this.props.user);
  }

  handlePageClick = (data) => {
    this.props.getPopularMovies(this.props.preference,data.selected+1);
  }

  handleFavourite = (movie) => {
    console.log(this.props);
    this.props.handleFavourite(movie, this.props.favourites, this.props.user);
  }

  handlePreference = (e) => {
    this.props.getPopularMovies(e.target.value, 1);
  }

  render(){
    const movies = this.props.movies;
    const r = movies? movies.map((movie, index)=>
      <MovieCard key={index} movie={movie} handleFavourite={this.handleFavourite} favourite={this.props.favourites.indexOf(movie.id)>=0}/>
    ): 'loading';
    console.log(this.props);
    return (
      <div>
      <h2>Welcome</h2>
      <h4>{this.props.user}</h4>
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
  movies: state.usermovies.movies,
  currentPage: state.usermovies.currentPage,
  favourites: state.usermovies.favourites,
  preference: state.usermovies.preferencem,
  user: state.usermovies.user
})

export default connect(mapStateToProps, {getPopularMovies, handleFavourite, getFavouriteMovies} )(LoggedInUser);
