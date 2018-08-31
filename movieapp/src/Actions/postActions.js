import {GET_POPULAR_MOVIES, UPDATE_FAVOURITE_MOVIES, GET_FAVOURITE_MOVIES} from './types.js';

export const getPopularMovies = (preference,page) =>{
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


export const handleFavourite = (movie, favourites) =>{

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
      fetch("http://localhost:8080/guest/guest",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify( {favourites:favourites, id:'guest'} )
      })

    }
  }

export const getFavouriteMovies = () =>{
  return function (dispatch){
  fetch("http://localhost:8080/guest/")
    .then(data=>data.json())
    .then(favourites=>{
      console.log('favs',favourites[0].favourites);
      dispatch({
        type: GET_FAVOURITE_MOVIES,
        payload: favourites[0].favourites
      })
    })
  }
}
