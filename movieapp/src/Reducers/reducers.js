import {combineReducers} from 'redux';

import postReducer from './postReducers';
import userReducer from './userReducer';

export default combineReducers({
  movies: postReducer,
  usermovies: userReducer
})
