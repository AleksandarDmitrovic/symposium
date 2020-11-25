export default function RenderMessages(props) {

  let className = "";
  let style = {};

  // Change the className for styling
  // Probably want to remove style and just do it with className

  // This is the sender ELSE it is the receiver
  if (props.userId === 'me') {
    className = 'outgoing-message style-right';
    style = {textAlign: 'right'};
  } else {
    className = 'incoming-message style-left';
  }

  return (
    <div>
      <p className={className} style={style}>{props.message}</p>
    </div>
  )
}

/* ==============================

Steps for Rendering a new message

1) Create state for messages and newMessages (Room.jsx)
2) Pass state and changeState functions to Call.jsx and ChatBox.jsx

3) ChatBox has a form that creates a new message
4) On Submit, calls sendMessage function
  5) Updates message State
  6) Adds message to allMessages (with 'me' as userId)
7) Updated message state triggers a useEffect in Call.jsx. Emits "new message" with message info
8) Server receives "new message", broadcasts "update chat box" with message info to all other users in room
9) Call.jsx receives "update chat box", updates newMessage state through changeState function
10) Updated state triggers useEffect in ChatBox.jsx, updates allMessages state
11) Updated state causes a rerender of ChatBox component with allMessages

============================== */ 