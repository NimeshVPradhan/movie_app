const userKey = 'movieapp';

export const getLocalStorage = () => {
  return localStorage.getItem(userKey);
}

export const setLocalStorage = (token) => {
  localStorage.setItem(userKey, token);
}

export const deleteLocalStorage = () => {
  localStorage.setItem(userKey, null);
}
