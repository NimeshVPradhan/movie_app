import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieCards from './Containers/MovieCards/MovieCards.js';
import Login from './Containers/Login/Login.js';
import Registration from './Containers/Registration/Registration.js';
import store from './Utils/Store.js';
import { Route, Router, Link } from 'react-router-dom';
import LoggedInUser from './Containers/LoggedIn/LoggedInUser.js';
import UserFavorites from './Containers/LoggedIn/UserFavorites.js';
import GuestFavorites from './Containers/MovieCards/GuestFavorites.js';

import history from './history.js';
import {Provider } from 'react-redux';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
      </header>

      <Router history={history}>
      <div>
      <Route path='/' exact={true} component={MovieCards} />
      <Route path='/Guestfavorites' exact={true} component={GuestFavorites} />
      <Route path='/login' exact={true} component={Login} />
      <Route path='/register' exact={true} component={Registration} />
      <Route path='/user' exact={true} component={LoggedInUser} />
      <Route path='/userfavorites' exact={true} component={UserFavorites} />
      </div>
      </Router>

      </div>
      </Provider>
    );
  }
}

export default App;
