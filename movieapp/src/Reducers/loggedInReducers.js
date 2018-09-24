import {GET_POPULAR_MOVIES, UPDATE_FAVOURITE_MOVIES, GET_FAVOURITE_MOVIES, USER_SESSION, SESSION_LOGOUT, SET_USER_STATE, RESET_USER_STATE} from '../Actions/types.js';

const initialState = {
  movies: [],
  currentPage: 1,
  favorites: [],
  preference: 'popular',
  session: false,
  user: '',
  pageCount: 0
}

export default function(state= initialState, action){
  switch (action.type) {
    case GET_POPULAR_MOVIES:
    return{
      ...state,
      movies: action.payload.movies,
      currentPage: action.payload.currentPage,
      preference: action.payload.preference,
      pageCount: action.payload.pageCount
    }
    case UPDATE_FAVOURITE_MOVIES:
    return{
      ...state,
      favorites: action.payload
    }
    case GET_FAVOURITE_MOVIES:
    return{
      ...state,
      favorites: action.payload
    }
    case USER_SESSION:
    return {
      ...state,
      session: action.payload.session,
      user: action.payload.user
    }
    case SESSION_LOGOUT:
    return{
      ...state,
      session: action.payload.session,
      user: action.payload.user
    }
    case SET_USER_STATE:
    return{
      ...action.payload
    }
    case RESET_USER_STATE:
    return{
      ...initialState
    }
    default:
    return state;
  }
}
