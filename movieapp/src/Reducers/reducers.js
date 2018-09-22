import {combineReducers} from 'redux';

import loginReducers from './loginReducers';
import loggedInReducers from './loggedInReducers';
import registerReducers from './registerReducers';

export default combineReducers({
  login: loginReducers,
  user: loggedInReducers,
  register: registerReducers
})
