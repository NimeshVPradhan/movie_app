import React, {Component} from 'react';
import './MovieCard.css';
import nfav from './images/nfav.png';
import fav from './images/fav.png';
import MovieCardModal from './MovieCardModal.js';

class MovieCard extends Component{

  constructor(props){
    super(props);
  }

  handleFavorite = () => {
    this.props.handleFavorite(this.props.movie);
  }

  handleModal = (movie) => {
    this.props.handleModal(movie);
  }

  render(){
    return(
      <div className = 'col-sm-4 col-md-4 col-lg-2 m'>
        <div className = 'moviecard'>
          <button type="button" className="btn btn-link w-100 p-0 m-0" onClick={()=>this.handleModal(this.props.movie)}>
            <img className='poster img-responsive w-100' src = {'https://image.tmdb.org/t/p/w200'+this.props.movie.poster_path} alt={this.props.movie.original_title}/>
          </button>
          <div className='title'>
            <img src={this.props.favorite?fav:nfav} alt='favorite'  className='image' onClick={this.handleFavorite}/>
            <span>{this.props.movie.original_title}</span>
          </div>
        </div>
      </div>
    )
  }

}

export default MovieCard;
