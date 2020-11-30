import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { config } from '../utility/Constants'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
      usernameOrEmail: '',
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
    const {usernameOrEmail, password} = this.state
    let user = {
      usernameOrEmail: usernameOrEmail,
      password: password
    }
    let url = config.url.BASE_URL + 'login'

    axios.post(url, {user}, {headers: {'Access-Control-Allow-Origin': '*'}}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
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
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })
        }
        </ul>
      </div>
    )
  }
render() {
    const {usernameOrEmail, password} = this.state

return (
      <div>
      <ul>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Username or Email"
            type="text"
            name="usernameOrEmail"
            value={usernameOrEmail}
            onChange={this.handleChange}
          />

          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            or <Link to='/signup'>Sign Up</Link>
          </div>

          </form>
          <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
        </ul>
      </div>
    );
  }
}
export default Login;
