import React from 'react';
import MovieCard from '../../Components/MovieCard/MovieCard.js';
import MovieCardModal from './MovieCardModal.js';


class MovieCardHOC extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      movies: [],
      favorites:[],
      open: false,
      modalMovie: {}
    }
  }

  verifyFavorite = (movie) => {
    const f = this.state.favorites;
    for(let i in f){
      if(movie.id===f[i]) return true;
    }
    return false;
  }

  static getDerivedStateFromProps(nextProps, nextState){
    return {
      movies: nextProps.movies,
      favorites: nextProps.favorites
    };
  }

  handleModal = (movie) => {
    this.setState({
      open: !this.state.open,
      modalMovie: movie
    })
  }

  render(){
    const movies = this.state.movies;
    const moviecardrender = movies.length>0? movies.map((movie, index)=>
      <MovieCard key={movie.id}
                 movie={movie}
                 handleFavorite={this.props.handleFavorite}
                 favorite={this.verifyFavorite(movie)}
                 handleModal={this.handleModal}/>
    ): 'loading';
    return (
      <div>
        <div className='container'>
          <div className='row'>
            {moviecardrender}
          </div>
        </div>
        {this.state.open? <MovieCardModal movie={this.state.modalMovie}
                                          handleFavorite={this.props.handleFavorite}
                                          favorite={this.verifyFavorite(this.state.modalMovie)}
                                          handleModal={this.handleModal}
                                          open={this.state.open} />:''}
      </div>
    )
  }
}

export default MovieCardHOC;
