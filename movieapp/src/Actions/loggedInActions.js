import {GET_POPULAR_MOVIES, UPDATE_FAVOURITE_MOVIES, GET_FAVOURITE_MOVIES, USER_SESSION} from './types.js';
import history from '../history.js';

import generateHeaders from '../Utils/generateHeaders.js';
import {getLocalStorage, deleteLocalStorage, setLocalStorage} from '../Utils/localStorage.js'

export const initialSetup = (user) =>{
  return function(dispatch){
    const session = getLocalStorage();
    if(session && user){
      dispatch(getUserfavorites(user));
      dispatch(getPopularMovies('popular',1,user));
    }else{
      history.push('/')
    }
  }
}

export const getUserfavorites = (username) => {
  return function(dispatch){
    fetch("/users/"+username+"/favorites",{
      headers:generateHeaders()
    })
    .then(r=>r.json())
    .then(data=>{
      setLocalStorage(data.token);
      console.log('logged in actions getUserfavorites', data.data);
      dispatch({
        type : GET_FAVOURITE_MOVIES,
        payload: data.data
      })
    })
  }
}

export const getPopularMovies = (preference,page, username) =>{

  return function (dispatch, getState){

    fetch("/users/user/type="+preference+"&page="+page,{
      headers:generateHeaders()
    })
    .then(r=>r.json())
    .then(data =>{
//      console.log('getPopularMovies', data);
      setLocalStorage(data.token);
      const payload = {
        movies: data.data.results,
        currentPage: page,
        preference: preference,
        pageCount: data.data.total_pages
      }
      dispatch({
        type: GET_POPULAR_MOVIES,
        payload: payload
      })
    })
  }
}


export const handleFavorite = (movie, favorites, username) =>{

  return function (dispatch, getState){
    const state = getState();
    const copy = JSON.parse(JSON.stringify(state));
    var favorites = copy.user.favorites;
    favorites.indexOf(movie.id)>=0?
    favorites.splice(favorites.indexOf(movie.id),1):
    favorites.push(movie.id);
    console.log('use favs',favorites);
    fetch("/users/"+username+"/favorites",{
      headers: generateHeaders(),
      method: 'PUT',
      body: JSON.stringify( {favorites:favorites, id:username} )
    })
    .then(r=>{
    //  console.log('updarte fav',r);
      r.json()
      .then(res=>setLocalStorage(res.token));
      if(r.status===200){
        dispatch({
          type: UPDATE_FAVOURITE_MOVIES,
          payload: favorites
        })
      }else{
        const payload = {
          session: false,
          user: ''
        }
        dispatch({
          type: USER_SESSION,
          payload: payload
        })
      }
    })
  }
}

export const updateFavoriteOrder = (favorites) => {
  return function(dispatch,getState){
    const username = getState().user.user;
    fetch("/users/"+username+"/favorites",{
      headers: generateHeaders(),
      method: 'PUT',
      body: JSON.stringify( {favorites:favorites, id:username} )
    })

    dispatch({
      type: UPDATE_FAVOURITE_MOVIES,
      payload: favorites
    })
  }
}

export const handleLogout = () => {
  deleteLocalStorage();
  return function(dispatch){
    const payload = {
      session : false,
      user: ''
    }
    dispatch({
      type: USER_SESSION,
      payload: payload
    })
  }
}
