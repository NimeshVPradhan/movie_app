const userKey = 'movieapp';
const userKeyState = 'movieappstore';

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(userKey));
}

export const setLocalStorage = (token, username) => {
  const _token = {
    token: token,
    user: username
  }
  localStorage.setItem(userKey, JSON.stringify(_token));
}

export const deleteLocalStorage = () => {
  localStorage.setItem(userKey, null);
}

export const setStateToLocalStorage = (state) => {
  let _state;
  if(state){
    _state=state
  }else{
    _state = {
      movies: [],
      currentPage: 1,
      favorites: [],
      preference: 'popular',
      session: false,
      user: '',
      pageCount: 0
    }
  }
  localStorage.setItem(userKeyState, JSON.stringify(_state));
}

export const getStateFromLocalStorage = () => {
  const state = localStorage.getItem(userKeyState);
  return  JSON.parse(state);
}
