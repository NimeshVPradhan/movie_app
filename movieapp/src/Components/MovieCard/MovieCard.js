import React, {Component} from 'react';
import './MovieCard.css';
import nfav from './images/nfav.png';
import fav from './images/fav.png';
import {ModalDetails} from './MovieCardModal.js';

class MovieCard extends Component{

  constructor(props){
    super(props);
    this.state = {
      open: false,
      cast: [],
      genres: [],
      keywords: [],
      showFullCast: false,
      showFullGenres: false
    }
  }

  handleFavorite = () => {
    this.props.handleFavorite(this.props.movie);
  }

  toggle = () => {
    this.setState({
      open: !this.state.open
    });
  }

  handleShowFullCast = () => {
    console.log('handleShowFullCast');
    this.setState({
      showFullCast : !this.state.showFullCast
    });
  }

  handleShowFullGenres = () => {
    console.log('handleShowFullGenres');
    this.setState({
      showFullGenres : !this.state.showFullGenres
    });
  }

  getDetails = async () => {
    const _credits = await fetch("https://api.themoviedb.org/3/movie/"+this.props.movie.id+"/credits?api_key=24786ae86c770b971c0c4549de40dea7");
    const _keyWords = await fetch("https://api.themoviedb.org/3/movie/"+this.props.movie.id+"/keywords?api_key=24786ae86c770b971c0c4549de40dea7");
    const _details = await fetch("https://api.themoviedb.org/3/movie/"+this.props.movie.id+"?api_key=24786ae86c770b971c0c4549de40dea7");

    const details = await _details.json();
    const credits = await _credits.json();
    const keyWords = await _keyWords.json();

    const cast = credits.cast.map(cast=> cast.name);
    const genres = details.genres.map(genre=> genre.name);
    const keys = keyWords.keywords.map(keyword=> keyword.name);
  //  console.log(keys);
      this.setState({
        open: true,
        cast: cast,
        genres: genres,
        keywords: keys
      })
  }

  render(){
    return(
      <div className = 'col-sm-4 col-md-4 col-lg-2 m'>
      <div className = 'moviecard'>
        <button type="button" className="btn btn-link w-100 p-0 m-0" onClick={this.getDetails}>
          <img className='poster img-responsive w-100' src = {'https://image.tmdb.org/t/p/w200'+this.props.movie.poster_path} alt={this.props.movie.original_title}/>
        </button>
        <div className='title'>
        <img src={this.props.favourite?fav:nfav} alt='favorite'  className='image' onClick={this.handleFavorite}/>
        <span>{this.props.movie.original_title}</span>
        </div>
      <div>
      </div>
      </div>
        <ModalDetails
          movie={this.props.movie}
          genres={this.state.genres}
          open={this.state.open}
          cast={this.state.cast}
          showFullCast={this.state.showFullCast}
          showFullGenres={this.state.showFullGenres}
          toggle={this.toggle}
          className={this.props.className}
          favorite={this.props.favourite}
          handleFavorite={this.handleFavorite}
          handleShowFullCast={this.handleShowFullCast}
          handleShowFullGenres={this.handleShowFullGenres} />
      </div>
    )
  }

}

export default MovieCard;
