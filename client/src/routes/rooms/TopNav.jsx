import { useEffect, useState } from 'react';

import axios from 'axios';

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
        <li><a href="/">Back</a></li>
        <li><h5>{creator}'s Room</h5></li>

        {props.timer && 
        <Timer>
          <div>
            <Timer.Hours /> :         
            <Timer.Minutes /> : 
            <Timer.Seconds />  
          </div>
        </Timer>}
      </ul>
    </nav>
  );
}