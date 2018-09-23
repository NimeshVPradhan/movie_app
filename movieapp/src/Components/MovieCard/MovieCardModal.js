import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class MovieCardModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      cast: [],
      genres: [],
      keywords: [],
      showFullCast: false,
      showFullGenres: false,
      favorite: false
    }
  }

  handleShowFullCast = () => {
    this.setState({
      showFullCast : !this.state.showFullCast
    });
  }

  handleShowFullGenres = () => {
    this.setState({
      showFullGenres : !this.state.showFullGenres
    });
  }

  handleFavorite = () =>{
    this.setState({
      favorite: !this.state.favorite
    })

    this.props.handleFavorite(this.props.movie)
  }

  componentDidMount(){
    this.getDetails();
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
    this.setState({
      cast: cast,
      genres: genres,
      keywords: keys
    })
  }

  handleModal = () => {
    this.props.handleModal();
  }
  render(){
    return (
      <Modal isOpen={this.props.open} toggle={this.handleModal} className={this.props.className}>
        <ModalHeader toggle={this.handleModal}>{this.props.movie.original_title}</ModalHeader>
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
                <div onMouseEnter={this.handleShowFullGenres}
                     onMouseLeave={this.handleShowFullGenres}
                     className={this.state.showFullGenres?'':'overflow'}><span>Genres: </span> {this.state.genres.join(', ')}</div><hr/>
                <div onMouseEnter={this.handleShowFullCast}
                     onMouseLeave={this.handleShowFullCast}
                     className={this.state.showFullCast?'':'overflow'}><span>Cast:</span> {this.state.cast.join(', ')}</div><hr/>
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
          <Button color="secondary" onClick={this.handleFavorite}>{this.props.favorite?'Remove favorite':'Add to favorite'}</Button>
        </ModalFooter>
      </Modal>
    )
  }

}

export default MovieCardModal;
