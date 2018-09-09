const generateHeaders = () => {
  const token = localStorage.getItem('movieapp');
  return {
    'authorization':'bearer '+token,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export default generateHeaders;
