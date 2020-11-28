import { useState, useEffect } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
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

  return (
    <>
      {active && 
        <Card className='conversation-card'>
          <div className='card'>
            <CardMedia
                className='cover-photo'
                image={props.image}
                title="cover-photo"
              />
            <CardActionArea onClick={joinRoom} style={{height: 'inherit'}}>
              <CardContent className='body'>
                <div className='convo-info'>
                  <header>
                    <Typography gutterBottom style={{fontFamily: "'Raleway', sans-serif"}} variant="h5" component="h2">
                      {props.title}
                    </Typography>
                    <Timer
                        initialTime={secondsForTimer}
                        direction="backward"
                    >
                      {() => (
                        <p>Conversation Closes In: <Timer.Hours /> hours <Timer.Minutes /> minutes</p>
                      )}
                    </Timer>
                  </header>
                  <Typography variant="body1" style={{fontFamily: "'Raleway', sans-serif"}} className='description' component="p" >
                    {props.description}
                  </Typography>
                </div>
                <section className='pod'>
                  <div className='podcast-info'>
                    <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
                      {props.podcast_name}
                    </Typography>
                    <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
                      {props.episode_title}
                    </Typography>
                    <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
                      Category: {category}
                    </Typography>
                  </div>
                  <div className='player'>
                    <EmbedPodcast embed_url={props.audio} />
                    <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
                      Timestamps: {props.starts_at} - {props.ends_at}
                    </Typography>
                  </div>
                </section>
              </CardContent>
            </CardActionArea>   
              <footer className='share'>
                <CardActions style={{alignItems: 'baseline'}}>
                  <p className='share-room'>Share this Room </p>
                  <SocialMedia 
                    description={props.description}
                    url={roomURL}
                  >
                  </SocialMedia>
                  <Button className='join-room' size='large' color="primary" onClick={joinRoom}>Join Room</Button>
                </CardActions>
              </footer>
          </div>
        </Card>
      }
    </>
  )

}