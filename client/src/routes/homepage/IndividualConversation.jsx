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
              <div className='info'>
                <Typography gutterBottom style={{fontFamily: "'Raleway', sans-serif"}} variant="h5" component="h2">
                  {props.title}
                </Typography>
                <Typography variant="body1" style={{fontFamily: "'Raleway', sans-serif"}} className='description' component="p" >
                  {props.description}
                </Typography>
                <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
                  {props.podcast_name}
                </Typography>
                <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
                  {props.episode_title}
                </Typography>
                <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
                  Timestamps: {props.starts_at} - {props.ends_at}
                </Typography>
                <Typography className='italic' style={{fontFamily: "'Raleway', sans-serif"}} variant="body2" color="textSecondary" component="p">
                  Category: {category}
                </Typography>
                <label>Conversation Closes In: </label>
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
              </div>
                <EmbedPodcast embed_url={props.audio} />
              </CardContent>
            </CardActionArea>   
              <CardActions  style={{ display: 'flex', paddingBottom: '1em', alignItems: 'baseline', justifyContent: 'inherit'}}>
                <Button className='join-room' size='large' color="primary" onClick={joinRoom}>Join Room</Button>
                <div className='share'>
                  <p style={{fontFamily: "'Raleway', sans-serif"}}>Share this Room </p>
                  <SocialMedia 
                    description={props.description}
                    url={roomURL}
                  >
                  </SocialMedia>
                </div>
              </CardActions>
          </div>
        </Card>
      }
    </>
  )

}