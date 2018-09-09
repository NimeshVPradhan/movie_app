import {GET_POPULAR_MOVIES_GUEST, UPDATE_FAVOURITE_MOVIES_GUEST, GET_FAVOURITE_MOVIES_GUEST} from '../Actions/types.js';

const initialState = {
  movies: [],
  currentPage: 1,
  favorites: [],
  preference: 'popular'
}

export default function(state= initialState, action){
  switch (action.type) {
    case GET_POPULAR_MOVIES_GUEST:
      return{
        ...state,
        movies: action.payload,
        currentPage: action.currentPage,
        preference: action.preference
      }
    case UPDATE_FAVOURITE_MOVIES_GUEST:
      return{
        ...state,
        favorites: action.payload
      }
    case GET_FAVOURITE_MOVIES_GUEST:
    return{
      ...state,
      favorites: action.payload
    }
    default:
      return state;
  }
}
