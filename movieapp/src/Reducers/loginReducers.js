import {USER_LOGIN_LOADING, USER_LOGIN_SUCCES, USER_LOGIN_ERR} from '../Actions/types.js';

const initialState = {
  state: ''
}

export default function(state=initialState, action){
  //console.log('reducer');
  switch (action.type) {
    case USER_LOGIN_LOADING:
    return {
      ...state,
      status: 'loading'
    }
    case USER_LOGIN_SUCCES:
    return {
      ...state,
      status: ''
    }
    case USER_LOGIN_ERR:
    return {
      ...state,
      status: action.payload
    }
    default:
    return state;
  }
}
