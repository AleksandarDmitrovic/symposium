import SocialMedia from '../rooms/SocialMedia';
import { Paper, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import './conversation-styles/individualConversation.scss'

export default function IndividualConversation(props) {

  const roomURL = `/room/${props.url}`

  const joinRoom = () => {
    props.history.push(roomURL)
  }

  return (
    // <div style={ {border: "1px solid black", margin: '1em' } } >
    //   <img src={props.image} alt="itunes" width="100" height="100"/>
    //   <p>{props.title}</p>
    //   <p>{props.podcast_name}</p>
    //   <p>{props.episode_title}</p>
    //   <p>{props.description}</p>
    //   <p>Time Elapsed</p>
    //   <button onClick={joinRoom}>Join Room</button>
    //   <SocialMedia 
    //     description={props.description}
    //     url={roomURL}
    //   >
    //   </SocialMedia>
    // </div>

    // <div className='conversation-card'>
    //   <Paper className='card' elevation={3}>
    //     <img className='cover-photo' src={props.image} alt="itunes" />
    //     <section className='body'>
    //       <header>
    //         <h5 className='start'>{props.title}</h5>
    //         <p className='end'>Time Remaining: ""min</p>
    //       </header>
    //       <article>
    //         <div className='info'>
    //           <p>{props.description}</p>
    //           <p className='italic'>{props.podcast_name}</p>
    //           <p className='italic'>{props.episode_title}</p>
    //           <p>Timestamps: {props.starts_at} - {props.ends_at}</p>
    //         </div>
    //         <div className='embedded-player'>
    //           <p>Player goes here</p>
    //         </div>
    //       </article>
    //       <footer>
    //         <Button color="primary" onClick={joinRoom}>Join Room</Button>
    //         <div class='share'>
    //           <p>Share this Room </p>
    //           <SocialMedia 
    //             description={props.description}
    //             url={roomURL}
    //           >
    //           </SocialMedia>
    //         </div>
    //       </footer>
    //     </section>
    //   </Paper>
    // </div>

    <Card className='conversation-card'>
      <div className='card'>
      <CardMedia
          className='cover-photo'
          image={props.image}
          title="Contemplative Reptile"
        />
      <article>
        <CardActionArea className='info'>
          <CardContent className='body'>
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
            
          </CardContent>
        </CardActionArea>
          <CardActions style={{display:'flex', alignItems:'baseline', justifyContent: 'space-between', padding: '1em'}}>
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