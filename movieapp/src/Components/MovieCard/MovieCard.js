import React, {Component} from 'react';
import './MovieCard.css';
import nfav from './images/nfav.png';
import fav from './images/fav.png';

class MovieCard extends Component{

  handleFavourite = () => {
    this.props.handleFavourite(this.props.movie);
  }

  render(){
//    console.log(this.props.movie);
    return(
      <div className = 'moviecard col-lg-3 col-md-6 col-sm-12 mini'>
      <div className ='moviecard-content'>
      <div>
        <img src={this.props.favourite?fav:nfav} alt='favorite'  className='image' onClick={this.handleFavourite}/>
        <span>{this.props.movie.original_title}</span>
      </div>
      <div>
        <img src = {'https://image.tmdb.org/t/p/w500'+this.props.movie.poster_path} alt={this.props.movie.original_title}/>
        <p>Genres:Drama</p>
        <p>Overview:{this.props.movie.overview}</p>
      </div>
      </div>
      </div>
    )
  }

}

export default MovieCard;
