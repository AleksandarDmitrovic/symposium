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



// import SocialMedia from '../rooms/SocialMedia';
// import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
// import './conversation-styles/individualConversation.scss'
// import EmbedPodcast from '../rooms/EmbedPodcast';

// export default function IndividualConversation(props) {

//   const roomURL = `/room/${props.url}`

//   const joinRoom = () => {
//     props.history.push(roomURL)
//   }

//   return (
//     <Card className='conversation-card'>
//       <div className='card'>
//       <CardMedia
//           className='cover-photo'
//           image={props.image}
//           title="Contemplative Reptile"
//         />
//       <article>
//           <CardActionArea>
//             <CardContent className='body'>
//             <div className='info'>
//               <Typography gutterBottom style={{fontFamily: "'Raleway', sans-serif"}} variant="h5" component="h2">
//                 {props.title}
//               </Typography>
//               <Typography variant="body1" style={{fontFamily: "'Raleway', sans-serif"}} className='description' component="p" >
//                 {props.description}
//               </Typography>
//               <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
//                 {props.podcast_name}
//               </Typography>
//               <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
//                 {props.episode_title}
//               </Typography>
//               <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
//                 Timestamps: {props.starts_at} - {props.ends_at}
//               </Typography>
//             </div>
//             <EmbedPodcast embed_url = {props.audio} />
//             </CardContent>
//             <CardActions  style={{ display: 'flex', paddingBottom: '1em', alignItems: 'baseline', justifyContent: 'inherit'}}>
//               <Button className='join-room' size='large' color="primary" onClick={joinRoom}>Join Room</Button>
//               <div className='share'>
//                 <p style={{fontFamily: "'Raleway', sans-serif"}}>Share this Room </p>
//                 <SocialMedia 
//                   description={props.description}
//                   url={roomURL}
//                 >
//                 </SocialMedia>
//               </div>
//             </CardActions>
//           </CardActionArea>   
//       </article>
//       </div>
//     </Card>
//   );
// }