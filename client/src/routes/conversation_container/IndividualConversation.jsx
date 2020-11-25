import SocialMedia from '../rooms/SocialMedia';

export default function IndividualConversation(props) {

  const roomURL = `/room/${props.url}`

  const joinRoom = () => {
    props.history.push(roomURL)
  }
  console.log(props.is_active)

  return (
    <>
      {props.is_active && 
      <div style={ {border: "1px solid black", margin: '1em' } } >
        <img src={props.image} alt="itunes" width="100" height="100"/>
        <p>{props.title}</p>
        <p>{props.podcast_name}</p>
        <p>{props.episode_title}</p>
        <p>{props.description}</p>
        <p>{props.time_available_seconds}</p>
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



