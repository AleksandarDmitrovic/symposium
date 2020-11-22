

export default function IndividualConversation(props) {

  const joinRoom = () => {
    props.history.push('/room/4')
  }

  return (
    <div style={ {border: "1px solid black", margin: '1em' } } >
      <img src={props.image} alt="itunes" width="100" height="100"/>
      <p>{props.title}</p>
      <p>{props.podcast_name}</p>
      <p>{props.description}</p>
      <p>Time Elapsed</p>
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
}



