import { useState, useEffect } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import Timer from 'react-compound-timer';
import axios from 'axios';
import moment from 'moment'

import EmbedPodcast from '../rooms/EmbedPodcast';
import SocialMedia from '../rooms/SocialMedia';
import './conversation-styles/individualConversation.scss'

export default function IndividualConversation(props) {
  const { id, history, category_id } = props;
  const [active, setActive] = useState(true);
  const [category, setCategory] = useState("");

  const roomURL = `/room/${props.url}`

  const joinRoom = () => {
    history.push(roomURL)
  }
  
  useEffect(() => {  
    axios.get(`/api/categories/${category_id}`).then((res) => {
      setCategory(res.data.categoryName.name)
    });
  }, [category_id]);

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

  const numOfLines = props.description.length / 50;
  let padding;
  if (numOfLines > 2) {
    padding = '1em';
  } else if (numOfLines > 1) {
    padding = '2em';
  } else {
    padding = '2.75em';
  }

  return (
    <>
      {active && 
        <Card className='conversation-card' style={{background: '#101010'}}>
          <div className='card'>
            <CardMedia
              className='cover-photo'
              image={props.image}
              title="cover-photo"
            />
            <CardActionArea style={{height: 'inherit'}}>
              <CardContent className='body'>
                <div className='convo-info'>
                  <header>
                    <Typography 
                      className='card-title'
                      gutterBottom 
                      color='white' variant="p" 
                      component="p"
                    >
                      {props.title}
                    </Typography>
                    <Timer
                        initialTime={secondsForTimer}
                        direction="backward"
                    >
                      {() => (
                        <h4>Room Closes In: <Timer.Hours /> hours <Timer.Minutes /> minutes</h4>
                      )}
                    </Timer>
                  </header>
                  <Typography 
                    className='card-description'
                    variant="p"                    
                    color='white'  
                    component="p" 
                  >
                    {props.description}
                  </Typography>
                </div>
                <section className='pod'>
                  <div className='podcast-info'></div>
                  <div className='player' style={{paddingTop: padding}}>
                    <EmbedPodcast 
                      embed_url={props.audio} 
                      title={props.podcast_name} 
                      episode={props.episode_title} 
                      category={category}
                      class='convo-card-player'
                      
                    />
                  </div>
                </section>
              </CardContent>
            </CardActionArea>   
            <CardActions style={{display: 'flex', padding: '11px', alignItems: 'center'}}>
              <footer className='share'>
                <SocialMedia 
                  description={props.description}
                  url={roomURL}
                >
                </SocialMedia>
                <button className='bttn-jelly bttn-md bttn-primary join-room' onClick={joinRoom} style={{zIndex: 2}}>Join Room</button>
              </footer>
             </CardActions>
          </div>
        </Card>
      }
    </>
  )
}