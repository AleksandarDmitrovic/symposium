export default function IncomingMessage(props) {

  return (
    <div className="incoming-messages">
      <p>Username : {props.message}</p>
    </div>
  )
};