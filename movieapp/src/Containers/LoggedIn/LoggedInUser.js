import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './LoggedInUser.css';
import MovieCard from '../../Components/MovieCard/MovieCard.js';

import {Link } from 'react-router-dom';
import MovieCardHOC from '../../Components/MovieCard/MovieCardHOC.js';

import {connect} from 'react-redux';
import {initialSetup, getPopularMovies, handleFavorite, handleLogout} from '../../Actions/loggedInActions.js';
import {SelectMenu} from '../../Components/m.js';
import Paginate from '../../Components/Pagination/Paginate.js'


class LoggedInUser extends Component{

  componentDidMount(){
    this.props.initialSetup(this.props.user);
  }

  handlePageClick = (data) => {
    this.props.getPopularMovies(this.props.preference,data.selected+1);
  }

  handleFavorite = (movie) => {
    this.props.handleFavorite(movie, this.props.favorites, this.props.user);
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

          <SelectMenu onChange={this.handlePreference}/>

          <Link path='/' exact="true" to={{
            pathname: '/userfavorites'
          }}> Favorites </Link>
        <Paginate onPageChange={this.handlePageClick} pageCount={this.props.pageCount}/>
        <MovieCardHOC movies={this.props.movies} favorites={this.props.favorites} handleFavorite={this.handleFavorite}/>
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
  session: state.user.session,
  pageCount: state.user.pageCount
})

export default connect(mapStateToProps, {initialSetup, getPopularMovies, handleFavorite, handleLogout} )(LoggedInUser);
