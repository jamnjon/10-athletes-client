import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

import { config } from '../utility/Constants'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: '',
      firstname: '',
      lastname: ''
     };
  }

  componentDidMount() {
    let url = config.url.BASE_URL + 'logged_in'
    axios.get(url, {headers: {'Access-Control-Allow-Origin': '*'}}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.redirect()
      }
    });
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, firstname, lastname, password, password_confirmation} = this.state
    let user = {
      username: username,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      password_confirmation: password_confirmation
    }
    let url = config.url.BASE_URL + 'users'
    axios.post(url, {user}, {headers: {'Access-Control-Allow-Origin': '*'}}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/profile')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul>
      </div>
    )
  }

  render() {
    const {username, email, firstname, lastname, password, password_confirmation} = this.state
    if(this.props.loggedInStatus){
      this.redirect();
    }
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="First Name"
            type="text"
            name="firstname"
            value={firstname}
            onChange={this.handleChange}
          />
          <input
            placeholder="Last Name"
            type="text"
            name="lastname"
            value={lastname}
            onChange={this.handleChange}
          />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            placeholder="password confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />

          <button placeholder="submit" type="submit">
            Sign Up
          </button>
          <div>
            or <Link to='/login'>Log In</Link>
          </div>
        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}
export default Signup;
