export default function OutGoingMessage(props) {

  return (
    <div className="outgoing-messages" style={{textAlign: "right"}}>
      <p>Username : {props.message}</p>
    </div>
  )
};