import {GET_POPULAR_MOVIES, UPDATE_FAVOURITE_MOVIES, GET_FAVOURITE_MOVIES} from '../Actions/types.js';

const initialState = {
  movies: [],
  currentPage: 1,
  favourites: [],
  preference: 'popular'
}

export default function(state= initialState, action){
  switch (action.type) {
    case GET_POPULAR_MOVIES:
      return{
        ...state,
        movies: action.payload,
        currentPage: action.currentPage,
        preference: action.preference
      }
      break;
    case UPDATE_FAVOURITE_MOVIES:
      return{
        ...state,
        favourites: action.payload
      }
      break;
    case GET_FAVOURITE_MOVIES:
    return{
      ...state,
      favourites: action.payload
    }
    default:
      return state;
  }
}
