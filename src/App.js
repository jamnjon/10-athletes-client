import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import Profile from './components/Profile'
import Header from './components/Header'
import Rankings from './components/Rankings'
import { config } from './components/utility/Constants'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
     };
  }
  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    let url = config.url.BASE_URL + 'logged_in'
    axios.get(url, {headers: {'Access-Control-Allow-Origin': '*'}}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
        <Route
          path=''
          render={props => (
            props.location.pathname !== "/login" && props.location.pathname !== '/signup' &&
            <Header {...props} user={this.state.user} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
          )}
          />

          <Switch>
            <Route
              exact path='/'
              render={props => (
              <Home {...props} user={this.state.user} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/login'
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/signup'
              render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/profile'
              render={props =>(
                <Profile {...props} user={this.state.user} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/rankings'
              render={props =>(
                <Rankings {...props} user={this.state.user} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
