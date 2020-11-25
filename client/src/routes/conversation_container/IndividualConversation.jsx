import { useState, useEffect } from 'react';

import SocialMedia from '../rooms/SocialMedia';

import axios from 'axios';
import Timer from 'react-compound-timer';
import moment from 'moment'

export default function IndividualConversation(props) {
  const { id, history } = props;
  const [active, setActive] = useState(true);

  const roomURL = `/room/${props.url}`

  const joinRoom = () => {
    history.push(roomURL)
  }

  const timeConversationAvailable = props.available_until

  useEffect(() => {
    const numSeconds = timeConversationAvailable - moment().unix()
    if(numSeconds < 0) {
      setActive(false);
      
      axios.put(`/api/conversations/inactive`, { 
        active: active,
        id: id
      })
      .then((res) => {
        // console.log("Conversation has expired", res)
      })
      .catch(error => { console.error(error) });
    }
  }, [timeConversationAvailable, active, id, history]);
  
  const secondsForTimer = (timeConversationAvailable - moment().unix()) * 1000;

  return (
    <>
      {active && 
      <div style={ {border: "1px solid black", margin: '1em' } } >
        <img src={props.image} alt="itunes" width="100" height="100"/>
        <p>{props.title}</p>
        <p>{props.podcast_name}</p>
        <p>{props.episode_title}</p>
        <p>{props.description}</p>
        <p>{props.available_until}</p>
        <Timer
            initialTime={secondsForTimer}
            direction="backward"
        >
          {() => (
            <>
              <Timer.Hours /> hours
              <Timer.Minutes /> minutes
            </>
          )}
        </Timer>
        <button onClick={joinRoom}>Join Room</button>
        <SocialMedia 
          description={props.description}
          url={roomURL}
        >
        </SocialMedia>
      </div>
      }
    </>
  );
}



