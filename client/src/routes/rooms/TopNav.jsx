import { useEffect, useState } from 'react';

import axios from 'axios';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Timer from 'react-compound-timer';

export default function TopNav(props) {
  const [creator, setCreator] = useState('');


  useEffect(() => {
    axios.get(`/api/users/${props.creatorID}`)
      .then(res => {
        setCreator(res.data.user[0].username);
      })
      .catch(err => console.log('Error: ', err));
  }, [props.creatorID]);

  return (
    <nav className="top-nav">
      <ul>
        <li><a href="/"><ArrowBackIosIcon/></a></li>
        {/* <li><h5 className="creator-name"><b>{creator}'s Room</b></h5></li> */}
        <li><h5 className="conversation-title"><b>{props.title}</b></h5></li>

        {props.timer && 
        <Timer>
          <div className="timer">
            <Timer.Hours /> :         
            <Timer.Minutes /> : 
            <Timer.Seconds />  
          </div>
        </Timer>}
      </ul>
    </nav>
  );
}