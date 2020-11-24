import React, { useEffect, useState } from 'react';

import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'

export default function ChatBox(props) {

  const [chatBoxMessage, setChatBoxMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  function sendMessage(event) {
    event.preventDefault();
    props.setMessage(chatBoxMessage);
    // clear message form
    setChatBoxMessage("");
  };

  function changeHandler(event) {
    setChatBoxMessage(event.target.value);
  }

  useEffect(() => {
    if (props.newMessage !== "") {
      setAllMessages([...allMessages, props.newMessage])
    }
  }, [props.newMessage])

  const mapAllMessages = function (allMessages) {  
    // Ensure there are messages to render  
    if (allMessages.length > 0) {
      const message = allMessages.map(message => {
        return (
          <IncomingMessage
            message = {message}
          />
        )
      });

      return message;

    } else {
      // No messages in array
      return (
        <p>You have no messages to show</p>
      )
    }
  };



  return (
    <footer className="chat-box">
      <h4>Messages</h4>
      <div>
        { mapAllMessages(allMessages) }
      </div>

      <OutgoingMessage />

      <form onSubmit={ sendMessage }>
        <input type="text" id="message" name="message" onChange={changeHandler} value={chatBoxMessage}/>
        <input type="submit" value="Submit" />
      </form>
    </footer>
  );
}