import {GET_POPULAR_MOVIES, UPDATE_FAVOURITE_MOVIES, GET_FAVOURITE_MOVIES, USER_SESSION, SET_USER_STATE, RESET_USER_STATE} from './types.js';
import history from '../history.js';

import generateHeaders from '../Utils/generateHeaders.js';
import {getLocalStorage, deleteLocalStorage, setLocalStorage, setStateToLocalStorage, getStateFromLocalStorage} from '../Utils/localStorage.js'

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
    console.log('getUserfavorites session', session);
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
        console.log('session exp getUserfavorites');
        dispatch(handleLogout());
      }
    })
  }
}

export const getPopularMovies = (preference,page) =>{

  return function (dispatch, getState){
    const session = getLocalStorage();
    console.log('getPopularMovies session', session);

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
        console.log('session exp getPopularMovies');

        dispatch(handleLogout());
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
        dispatch(handleLogout());
      }
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
        dispatch(handleLogout());
      }
    })
  }
}

export const getFavoriteMovies = () => {
  return function(dispatch){
    return new Promise((resolve, reject)=>{
      const state = getStateFromLocalStorage();
      const favorites = state.favorites;
      const session = getLocalStorage();
      if(session!==null){
        fetch('/users/'+session.user+'/list?favorites='+favorites,{
          method:'GET',
          headers: generateHeaders()
        })
        .then(r=> {
          if(r.status===200){
            r.json()
            .then(res=>{
              setLocalStorage(res.token, session.user);
              resolve({
                favorites: res.data
              })
            }
          )
        }else{
          dispatch(handleLogout());
        }
      })
    }else{
      history.push('/');
    }
  })
}
}

export const setUserStateToProps = () => {
  return function(dispatch){
    return new Promise((resolve)=>{
      const state = getStateFromLocalStorage();
      dispatch({
        type: SET_USER_STATE,
        payload: state
      })
      resolve();
    })
  }
}

/*--------------------------Auxiliary functions----------------------*/


export const handleLogout = () => {
  deleteLocalStorage();
  setStateToLocalStorage();
  return function(dispatch){
    dispatch({
      type: RESET_USER_STATE
    })
  }
}

export const saveStateToLocalStorage = () => {
  return function(dispatch, getState){
    const state = getState();
    setStateToLocalStorage(state.user);
  }
}
