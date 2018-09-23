const generateHeaders = () => {
  const session = JSON.parse(localStorage.getItem('movieapp'))||'';
  return {
    'authorization':'bearer '+session.token,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export default generateHeaders;
