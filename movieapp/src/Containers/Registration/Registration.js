import React, {Component} from 'react';
import {Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {registerUser} from '../../Actions/registerActions.js';


class Registration extends Component{
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password: '',
      err:''
    }
  }

  componentDidMount(){
    console.log('registration');
  }

  onChange= (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      err: ''
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.username;
    const pw = this.state.password
    if(this.state.username.trim()&&this.state.password.trim()){
        this.props.registerUser(name, pw);
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
        <h3>Register</h3>
        <form onSubmit={this.handleSubmit}>
          <label>user name:</label>
          <input type='text' name='username' value={this.state.username} placeholder='username' onChange={this.onChange}/>
          <label>Password:</label>
          <input type='password' name='password' value={this.state.password} placeholder='password' onChange={this.onChange}/>
          <input type='submit' name='submit' value='Login'/>
        </form>
      </div>
      <div className='err'>{this.state.err}</div>
      <div className='state'>{this.props.status}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  status: state.register.status
})

export default connect(mapStateToProps, {registerUser})(Registration);
