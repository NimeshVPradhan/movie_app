import {combineReducers} from 'redux';

import postReducers from './postReducers';
import loginReducers from './loginReducers';
import loggedInReducers from './loggedInReducers';
import registerReducers from './registerReducers';

export default combineReducers({
  guest: postReducers,
  login: loginReducers,
  user: loggedInReducers,
  register: registerReducers
})
