import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const ModalDetails = props =>{
  return   <Modal isOpen={props.open} toggle={props.toggle} className={props.className}>
      <ModalHeader toggle={props.toggle}>{props.movie.original_title}</ModalHeader>
      <ModalBody>
        <div className='container'>
        <div className='row row-eq-height'>
          <div className='col-sm-6'>
          <img className='img-responsive' src = {'https://image.tmdb.org/t/p/w200'+props.movie.poster_path} alt={props.movie.original_title}/>
          </div>
          <div className='col-sm-6 details'>
            <div><span>Ratings: </span> {props.movie.vote_average}/10</div><hr/>
            <div><span>Total Votes:</span> {props.movie.vote_count}</div><hr/>
            <div><span>Language: </span> {props.movie.original_language}</div><hr/>
            <div onMouseEnter={props.handleShowFullGenres}
                  onMouseLeave={props.handleShowFullGenres}
                  className={props.showFullGenres?'':'overflow'}
              ><span>Genres: </span> {props.genres.join(', ')}</div><hr/>
            <div onMouseEnter={props.handleShowFullCast}
                  onMouseLeave={props.handleShowFullCast}
                  className={props.showFullCast?'':'overflow'}
            ><span>Cast:</span> {props.cast.join(', ')}</div><hr/>
            <div><span>Release date:</span> {props.movie.release_date}</div>
          </div>
        </div>
        <hr/>
        <div className='row'>
          <div className='overview'><span>Overview:</span> {props.movie.overview}</div><br/>
        </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.handleFavorite}>{props.favorite?'Remove favorite':'Add to favorite'}</Button>
      </ModalFooter>
    </Modal>
}
