import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import './LoggedInUser.css';
import MovieCard from '../../Components/MovieCard/MovieCard.js';

import {Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {initialSetup, getPopularMovies, handleFavourite, handleLogout} from '../../Actions/loggedInActions.js';

class LoggedInUser extends Component{

  componentWillMount(){
  }

  componentDidMount(){
    this.props.initialSetup(this.props.user);
  }

  handlePageClick = (data) => {
    this.props.getPopularMovies(this.props.preference,data.selected+1);
  }

  handleFavourite = (movie) => {
    this.props.handleFavourite(movie, this.props.favorites, this.props.user);
  }

  handlePreference = (e) => {
    this.props.getPopularMovies(e.target.value, 1);
  }

  handleBack = () => {
    this.props.history.push({
      pathname: '/'
    })
  }

  handleLogout = () => {
    this.props.handleLogout();
    this.props.history.push({
      pathname: '/'
    })
  }

  render(){
    const movies = this.props.movies;
    const favorites = this.props.favorites;

    const r = (typeof movies=='undefined' || typeof favorites=='undefined')? 'loading': movies.map((movie, index)=>
    <MovieCard key={movie.id} movie={movie} handleFavourite={this.handleFavourite} favourite={this.props.favorites.indexOf(movie.id)>=0}/>
  );
  return (
    <div>
    <div className={!this.props.session?'active':'inactive'}>
    <p>session expired</p>
    <button type='button' value='back' onClick={this.handleBack}>back</button>
    </div>
    <div className={this.props.session?'active':'inactive'}>
    <button type='button' onClick={this.handleLogout}>Logout</button>
    <h2>Welcome</h2>
    <h4>{this.props.user}</h4>
    <select onChange={this.handlePreference} >
    <option value='popular' >Most popular</option>
    <option value='now_playing' >Now playing</option>
    <option value='top_rated' >Top rated</option>
    <option value='upcoming' >Upcoming</option>
    </select>
    <Link path='/' exact="true" to={{
      pathname: '/userfavorites'
    }}> Favorites </Link>

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
    <div className='row'>
    {r}
    </div>
    </div>
    </div>
  )
}
}

const mapStateToProps = state => ({
  movies: state.user.movies,
  currentPage: state.user.currentPage,
  favorites: state.user.favorites,
  preference: state.user.preference,
  user: state.user.user,
  session: state.user.session
})

export default connect(mapStateToProps, {initialSetup, getPopularMovies, handleFavourite, handleLogout} )(LoggedInUser);
