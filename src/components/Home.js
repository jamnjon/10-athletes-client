import React from 'react';

import NewEvent from './NewEvent'

const Home = (props) => {

  if(props.loggedInStatus){
    return(
      <div >
        <NewEvent history={props.history} user={props.user}/>
      </div>
    )
  } else {
    props.history.push('/rankings')
    return(
      <div>
      </div>
    )
  }
};

export default Home;
