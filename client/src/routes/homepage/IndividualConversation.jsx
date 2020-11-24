import SocialMedia from '../rooms/SocialMedia';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import './conversation-styles/individualConversation.scss'
import EmbedPodcast from '../rooms/EmbedPodcast';

export default function IndividualConversation(props) {

  const roomURL = `/room/${props.url}`

  const joinRoom = () => {
    props.history.push(roomURL)
  }

  return (
    <Card className='conversation-card'>
      <div className='card'>
      <CardMedia
          className='cover-photo'
          image={props.image}
          title="Contemplative Reptile"
        />
      <article>
          <CardActionArea>
            <CardContent className='body'>
            <div className='info'>
              <Typography gutterBottom variant="h5" component="h2">
                {props.title}
              </Typography>
              <Typography variant="body1"  className='description' component="p" >
                {props.description}
              </Typography>
              <Typography className='italic' variant="body2" color="textSecondary" component="p">
                {props.podcast_name}
              </Typography>
              <Typography className='italic' variant="body2" color="textSecondary" component="p">
                {props.episode_title}
              </Typography>
              <Typography className='italic' variant="body2" color="textSecondary" component="p">
                Timestamps: {props.starts_at} - {props.ends_at}
              </Typography>
            </div>
            <EmbedPodcast embed_url = {props.audio} />
            </CardContent>
          </CardActionArea>   
        <CardActions className='footer' >
          <Button className='join-room' size='large' color="primary" onClick={joinRoom}>Join Room</Button>
          <div className='share'>
            <p>Share this Room </p>
            <SocialMedia 
              description={props.description}
              url={roomURL}
            >
            </SocialMedia>
          </div>
        </CardActions>
      </article>
      </div>
    </Card>
  );
}