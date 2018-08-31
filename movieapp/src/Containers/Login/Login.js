import React, {Component} from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {authUser} from '../../Actions/userActions.js';


class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password: '',
      err:''
    }
  }

  onChange= (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.username;
    const pw = this.state.password
    if(this.state.username.trim()&&this.state.password.trim()){
        this.props.authUser(name, pw);
        this.setState({
          err:'',
          username:'',
          password:''
        })
    }
    else{
      this.setState({
        err: 'please fill all the fields'
      })
    }
  }

  render(){
    return(
      <div>
      <Link to={{
            pathname: '/'
          }}> Back </Link>
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <label>user name:</label>
          <input type='text' name='username' value={this.state.username} placeholder='username' onChange={this.onChange}/>
          <label>Password:</label>
          <input type='password' name='password' value={this.state.password} placeholder='password' onChange={this.onChange}/>
          <input type='submit' name='submit' value='Login'/>
        </form>
      </div>
      <div className='err'>{this.state.err}</div>
      </div>
    )
  }
}

export default connect(null, {authUser})(Login);
