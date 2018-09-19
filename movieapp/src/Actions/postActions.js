const guestKey = 'movieapp_guest';

export const getMovies = async (preference,page) =>{

    const r = await fetch("https://api.themoviedb.org/3/movie/"+preference+"?api_key=24786ae86c770b971c0c4549de40dea7&page="+page)
    const res = await r.json();
  //  console.log('postactions',res.results);
    return res;
}


export const handleFavourite = (movie) =>{
    var favorites = JSON.parse(localStorage.getItem(guestKey)) || [];
    console.log('favs',favorites);
    var bool = true;
    for(let i in favorites){
      if(favorites[i].id===movie.id){
        favorites.splice(i,1);
        localStorage.setItem(guestKey,JSON.stringify(favorites));
        bool=false;
        break;
      }else{
        bool = true;
      }
    }

    if(bool)favorites.push(movie);
    localStorage.setItem(guestKey,JSON.stringify(favorites));
    return favorites;
}

export const getInitialFavouriteMovies = () =>{

  const f = localStorage.getItem(guestKey) || '[]';
  localStorage.setItem(guestKey, f)
  return JSON.parse(localStorage.getItem(guestKey));
}
