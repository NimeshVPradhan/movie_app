import React, {Component} from 'react';
import './MovieCard.css';
import nfav from './images/nfav.png';
import fav from './images/fav.png';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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

  handleFavourite = () => {
    this.props.handleFavourite(this.props.movie);
  }

  toggle = () => {
    this.setState({
      open: !this.state.open
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
        keywords: keyWords
      })
  }

  render(){
    let closeModal = () => this.setState({ open: false })
    //console.log(this.props.movie);
    var ModalDetails =    <Modal isOpen={this.state.open} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.movie.original_title}</ModalHeader>
          <ModalBody>
            <div className='container'>
            <div className='row row-eq-height'>
              <div className='col-sm-6'>
              <img className='img-responsive' src = {'https://image.tmdb.org/t/p/w200'+this.props.movie.poster_path} alt={this.props.movie.original_title}/>
              </div>
              <div className='col-sm-6 details'>
                <div><span>Ratings: </span> {this.props.movie.vote_average}/10</div><hr/>
                <div><span>Total Votes:</span> {this.props.movie.vote_count}</div><hr/>
                <div><span>Language: </span> {this.props.movie.original_language}</div><hr/>
                <div onMouseEnter={()=> this.setState({showFullGenres: true})}
                      onMouseLeave={()=> this.setState({showFullGenres:false})}
                      className={this.state.showFullGenres?'':'overflow'}
                  ><span>Genres: </span> {this.state.genres.join(', ')}</div><hr/>
                <div onMouseEnter={()=> this.setState({showFullCast: true})}
                      onMouseLeave={()=> this.setState({showFullCast:false})}
                      className={this.state.showFullCast?'':'overflow'}
                ><span>Cast:</span> {this.state.cast.join(', ')}</div><hr/>
                <div><span>Release date:</span> {this.props.movie.release_date}</div>
              </div>
            </div>
            <hr/>
            <div className='row'>
              <div className='overview'><span>Overview:</span> {this.props.movie.overview}</div><br/>
            </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleFavourite}>{this.props.favourite?'Remove favorite':'Add to favorite'}</Button>
          </ModalFooter>
        </Modal>

    return(
      <div className = 'col-sm-4 col-md-4 col-lg-2 m'>
      <div className = 'moviecard'>
      <div className ='moviecard-content'>
        <button type="button" className="btn btn-link w-100" onClick={this.getDetails}>
          <img className='poster img-responsive w-100' src = {'https://image.tmdb.org/t/p/w200'+this.props.movie.poster_path} alt={this.props.movie.original_title}/>
        </button>
        <div className='title'>
        <img src={this.props.favourite?fav:nfav} alt='favorite'  className='image' onClick={this.handleFavourite}/>
        <span>{this.props.movie.original_title}</span>
        </div>
      <div>
      </div>
      </div>
      </div>
      {ModalDetails}
      </div>
    )
  }

}

export default MovieCard;
