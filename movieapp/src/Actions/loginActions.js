import {USER_LOGIN_LOADING, USER_LOGIN_SUCCES, USER_LOGIN_ERR, USER_SESSION} from './types.js';
import history from '../history.js';

import generateHeaders from '../Utils/generateHeaders.js';
import {setLocalStorage} from '../Utils/localStorage.js'

export const loginUser = (username, pw) => {
  //console.log('login');
  return function(dispatch){
    dispatch({type: USER_LOGIN_LOADING});
    fetch("/users/"+username+"/login",{
      headers: generateHeaders(),
      method: 'POST',
      body: JSON.stringify( {pw: pw} )
    })
    .then(res => {
      //  console.log('login',res);
      if(res.status===200){
        dispatch({type: USER_LOGIN_SUCCES});
        res.json()
        .then(result =>{
          //  console.log('res', result.token);
          dispatch({
            type: USER_SESSION,
            payload: {
              session: true,
              user: result.user._id
            }
          })
          setLocalStorage(result.token);
          history.push('./user')
        })
      }else{
        if(res.status===404){
          dispatch({
            type: USER_LOGIN_ERR,
            payload: 'username or password do not match'
          })
        }}
      })
      .catch(()=> {
        dispatch({
          type: USER_LOGIN_ERR,
          payload: 'internal server error'
        })
      })
    }
  }
