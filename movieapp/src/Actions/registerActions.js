import {USER_REGISTRATION, USER_SESSION} from './types.js';
import history from '../history.js';

import generateHeaders from '../Utils/generateHeaders.js';
import {setLocalStorage} from '../Utils/localStorage.js'

export const registerUser = (username, pw) =>{
  return function(dispatch){
    fetch("/users/"+username+"/registration",{
      method: 'POST',
      headers: generateHeaders(),
      body: JSON.stringify({pw: pw}),
    })
    .then(res=>{
      if(res.status===409){
        dispatch({
          type: USER_REGISTRATION,
          payload: 'username already exists'
        })
      }else if(res.status===201){
        res.json()
        .then(result =>{
          dispatch({
            type: USER_SESSION,
            payload: {
              session: true,
              user: result.user
            }
          })
          setLocalStorage(result.token, result.user._id)
          history.push('./user')
        })
      }
    })
  }
}
