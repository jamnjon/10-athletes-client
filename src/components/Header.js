import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

import { config } from './utility/Constants'

const Header = (props) => {
const handleClick = () => {
  let url = config.url.BASE_URL + 'logout'
    axios.delete(url, {headers: {'Access-Control-Allow-Origin': '*'}}, {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/rankings')
    })
    .catch(error => console.log(error))
  }

  const handleProfileClick = () =>{
    props.history.push('/profile')
  }

  const handleHomeClick = () =>{
    props.history.push('/')
  }

  const handleRankingsClick = () => {
    props.history.push('/rankings')
  }

  if(props.loggedInStatus){
    return(
      <div style={{textAlign: "center"}}>
        <Link to='/logout' onClick={handleClick}><button  style={{backgroundColor: '#EFEFEF', color: 'black'}}>Log Out</button></Link>
        <Link to='/' onClick={handleHomeClick}><button style={{backgroundColor: props.location.pathname === '/' ? 'blue' : '#EFEFEF', color: props.location.pathname === '/' ? 'white' : 'black'}}>Submit Results</button></Link>
        <Link to='/profile' onClick={handleProfileClick}><button style={{backgroundColor: props.location.pathname === '/profile' ? 'blue' : '#EFEFEF', color: props.location.pathname === '/profile' ? 'white' : 'black'}}>Profile</button></Link>
        <Link to='/rankings' onClick={handleRankingsClick}><button style={{backgroundColor: props.location.pathname === '/rankings' ? 'blue' : '#EFEFEF', color: props.location.pathname === '/rankings' ? 'white' : 'black'}}>Rankings</button></Link>
      </div>
    )
  } else {
    return (
      <div>
      <ul>
          <Link to='/login' style={{fontSize: 'large'}}>Log In</Link>
        <br/><br/>
          <Link to='/signup' style={{fontSize: 'large'}}>Sign Up</Link>
          </ul>
      </div>
    );
  };
};

export default Header;
