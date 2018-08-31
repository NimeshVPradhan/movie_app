import React, {Component} from 'react';
import './MovieCard.css';
import nfav from './images/nfav.png';
import fav from './images/fav.png';

class MovieCard extends Component{

  handleFavourite = () => {
    this.props.handleFavourite(this.props.movie);
  }

  render(){

    return(

      <div className = 'moviecard'>
      <div className ='moviecard-content'>
      <div>
        <img src={this.props.favourite?fav:nfav}  className='image' onClick={this.handleFavourite}/>
        <span>{this.props.movie.original_title}</span>
      </div>
      <div>
        <img src = {'https://image.tmdb.org/t/p/w500'+this.props.movie.poster_path}/>
        <p>Genres:Drama</p>
        <p>Overview:{this.props.movie.overview}</p>
      </div>
      </div>
      </div>

    )
  }

}

export default MovieCard;
