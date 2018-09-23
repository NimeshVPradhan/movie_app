import {GET_POPULAR_MOVIES, UPDATE_FAVOURITE_MOVIES, GET_FAVOURITE_MOVIES, USER_SESSION} from './types.js';
import history from '../history.js';

import generateHeaders from '../Utils/generateHeaders.js';
import {getLocalStorage, deleteLocalStorage, setLocalStorage} from '../Utils/localStorage.js'

export const initialSetup = () =>{
  return function(dispatch,getState){
    const session = getLocalStorage();
    if(session){
      const payload = {
        session : true,
        user: session.user
      }
      dispatch({
        type: USER_SESSION,
        payload: payload
      })
      dispatch(getUserfavorites());
      dispatch(getPopularMovies('popular',1));
    }else{
      history.push('/')
    }
  }
}

export const getUserfavorites = () => {
  return function(dispatch){
    const session = getLocalStorage();
    fetch("/users/"+session.user+"/favorites",{
      headers:generateHeaders()
    })
    .then(r=>{
      if(r.status===200){
        r.json()
        .then(data=>{
          setLocalStorage(data.token, session.user);
          dispatch({
            type : GET_FAVOURITE_MOVIES,
            payload: data.data
          })
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

export const getPopularMovies = (preference,page) =>{

  return function (dispatch, getState){
    const session = getLocalStorage();
    fetch("/users/user/type="+preference+"&page="+page,{
      headers:generateHeaders()
    })
    .then(r=>{
      if(r.status===200){
        r.json()
        .then(data =>{
          setLocalStorage(data.token,session.user);
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


export const handleFavorite = (movie, favorites) =>{

  return function (dispatch, getState){
    const session = getLocalStorage();

    const state = getState();
    const copy = JSON.parse(JSON.stringify(state));
    var favorites = copy.user.favorites;
    favorites.indexOf(movie.id)>=0?
    favorites.splice(favorites.indexOf(movie.id),1):
    favorites.push(movie.id);
    fetch("/users/"+session.user+"/favorites",{
      headers: generateHeaders(),
      method: 'PUT',
      body: JSON.stringify( {favorites:favorites, id:session.user} )
    })
    .then(r=>{
      r.json()
      .then(res=>setLocalStorage(res.token,session.user));
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

/*-----------------Favorites page handlers--------------------------------*/

export const updateFavoriteOrder = (favorites) => {
  return function(dispatch,getState){
    const session = getLocalStorage();

    fetch("/users/"+session.user+"/favorites",{
      headers: generateHeaders(),
      method: 'PUT',
      body: JSON.stringify( {favorites:favorites, id:session.user} )
    })
    .then(r => {
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

export const getFavoriteMovies = (favorites) => {
  //return function(dispatch){
    const session = getLocalStorage();
    return fetch('/users/'+session.user+'/list?favorites='+favorites,{
      method:'GET',
      headers: generateHeaders()
    })
    .then(r=> {
      if(r.status===200){
        return r.json()
        .then(res=>{
          //console.log('getFavoriteMovies', res);
          setLocalStorage(res.token, session.user);
          return({
            favorites: res.data
          })
        }
      )
    }

    return function(dispatch){
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
//}
}
