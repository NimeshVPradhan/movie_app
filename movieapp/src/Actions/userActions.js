import {AUTH_USER, GET_POPULAR_MOVIES, UPDATE_FAVOURITE_MOVIES, GET_FAVOURITE_MOVIES} from './types.js';

import history from '../history.js';

export const authUser = (user, pw) =>{
  return function (dispatch){

    fetch("http://localhost:8080/users?name="+user+"&pw="+pw)
    .then(res=> res.json())
    .then(data =>{
      if(data.length!=0){
        history.push('./user');
        dispatch({
          type: AUTH_USER,
          payload: user
        })
      }else{
        console.log('not found');
      }
    }
  )
    .catch(err=>{
      console.log('err',err);
    })
    }
  }

  export const getPopularMovies = (preference,page) =>{
    console.log(GET_POPULAR_MOVIES);
    return function (dispatch){
      fetch("https://api.themoviedb.org/3/movie/"+preference+"?api_key=24786ae86c770b971c0c4549de40dea7&page="+page)
      .then(res=> res.json())
      .then(data =>
        dispatch({
          type: GET_POPULAR_MOVIES,
          payload: data.results,
          currentPage: page,
          preference: preference
        }))
      }
    }

    export const handleFavourite = (movie, favourites, user) =>{
        //console.log(UPDATE_FAVOURITE_MOVIES, user);
        return function (dispatch, getState){
          const state = getState();
          const copy = JSON.parse(JSON.stringify(state));
          var favourites = copy.movies.favourites;
          favourites.indexOf(movie.id)>=0?
              favourites.splice(favourites.indexOf(movie.id),1):
              favourites.push(movie.id);
          dispatch({
              type: UPDATE_FAVOURITE_MOVIES,
              payload: favourites
          })
          fetch("http://localhost:8080/users/"+user,{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify( {favourites:favourites} )
          })

        }
      }

      export const getFavouriteMovies = (user) =>{
        return function (dispatch){
        fetch("http://localhost:8080/users?id="+user+"/favourites")
          .then(data=>data.json())
          .then(favourites=>{
            console.log('favs',favourites);
            dispatch({
              type: GET_FAVOURITE_MOVIES,
              payload: favourites
            })
          })
        }
      }
