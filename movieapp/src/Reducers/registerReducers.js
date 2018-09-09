import {USER_REGISTRATION} from '../Actions/types.js';

const initialState = {
  state: ''
}

export default function(state=initialState, action){
  //console.log('reducer');
  switch (action.type) {
    case USER_REGISTRATION:
    return {
      ...state,
      status: action.payload
    }
    default:
    return state;
  }
}
