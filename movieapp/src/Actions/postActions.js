import {GET_POPULAR_MOVIES_GUEST, UPDATE_FAVOURITE_MOVIES_GUEST, GET_FAVOURITE_MOVIES_GUEST} from './types.js';

const guestKey = 'movieapp_guest';

export const getPopularMovies = async (preference,page) =>{
    const r = await fetch("https://api.themoviedb.org/3/movie/"+preference+"?api_key=24786ae86c770b971c0c4549de40dea7&page="+page)
    const res = await r.json();
    console.log(res.results);
    return res.results;
  }


export const handleFavourite = (movie) =>{
  console.log(movie);
    var favorites = localStorage.getItem(guestKey) || [];
    console.log(favorites);
    favorites.push(JSON.stringify(movie));
    localStorage.setItem(guestKey,favorites);

  }

export const getFavouriteMovies = () =>{
  return function (dispatch){
  fetch("http://localhost:8080/guest/")
    .then(data=> data.json())
    .then(favorites=>{
      console.log('favs',favorites[0].favorites);
      dispatch({
        type: GET_FAVOURITE_MOVIES_GUEST,
        payload: favorites[0].favorites
      })
    })
  }
}
