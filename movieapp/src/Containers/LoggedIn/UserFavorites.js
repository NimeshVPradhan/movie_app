import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';
import SortableList from '../../Components/SortableList/SortableList.js';


import {
  arrayMove,
} from 'react-sortable-hoc';
import {updateFavoriteOrder} from '../../Actions/loggedInActions.js';


class UserFavorites extends Component{
  constructor(props){
    super();
    this.state = {
      favorites:[],
      session : true
    }
  }

  componentDidMount(){
  //  console.log('component did miot', this.props.favorites);
    this.getFavoriteMovies(this.props.favorites);
  }

  getFavoriteMovies = (favorites) => {
    const token = localStorage.getItem('movieapp');
    console.log('faavs', favorites);
    fetch('http://localhost:8080/users/user/list?favorites='+favorites,{
      method:'GET',
      headers:{
        'authorization':'bearer '+token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(r=> {
      if(r.status===200){
        r.json()
        .then(res=>{
            localStorage.setItem('movieapp', res.token);
            this.setState({
              favorites: res.data
            })
          }
        )
      }else{
        this.setState({
          session: false
        })
      }
    })

  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const newOrder = arrayMove(this.props.favorites, oldIndex, newIndex);
    this.mapNewOrder(newOrder);
    this.props.updateFavoriteOrder(newOrder);
  };

  mapNewOrder = async (newOrder) => {
      var favs = this.state.favorites;
      var newFavoriteOrder = [];
      for(let i in newOrder){
        for(let j in favs){
          if(newOrder[i]===favs[j].id){
            newFavoriteOrder.push(favs[j]);
            break;
          }
        }
      }
    this.setState({favorites : newFavoriteOrder});
  }
  render(){
    const favs = this.state.favorites.map(people=>
      people
    )
  return (
    <div>
    <Link className='btn btn-outline-primary' path='/' exact="true" to={{
      pathname: '/user'
    }}> Back </Link>
    <div className='container'>
      {this.props.favorites.length===0?'no favorites :(': <SortableList items={favs} onSortEnd={this.onSortEnd} axis='xy' />}
    </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  favorites: state.user.favorites,
})

//export default UserFavorites;
export default connect(mapStateToProps, {updateFavoriteOrder} )(UserFavorites);
