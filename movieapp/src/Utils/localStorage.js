const userKey = 'movieapp';

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
