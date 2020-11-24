import React, { useEffect, useState } from 'react';

import IncomingMessage from './IncomingMessage'
import OutGoingMessage from './OutGoingMessage'

export default function ChatBox(props) {

  const [chatBoxMessage, setChatBoxMessage] = useState("");
  const [allIncomingMessages, setAllIncomingMessages] = useState([]);
  const [allOutGoingMessages, setAllOutGoingMessages] = useState([]);

  function sendMessage(event) {
    event.preventDefault();
    props.setMessage(chatBoxMessage);
    setAllOutGoingMessages([...allOutGoingMessages, chatBoxMessage]);
    // clear message form
    setChatBoxMessage("");
  };

  function changeHandler(event) {
    setChatBoxMessage(event.target.value);
  };

  useEffect(() => {
    if (props.newMessage !== "") {
      setAllIncomingMessages([...allIncomingMessages, props.newMessage])
    }
  }, [props.newMessage]);

  const mapAllIncomingMessages = allIncomingMessages => {  
    // Ensure there are messages to render  
    if (allIncomingMessages.length > 0) {
      const message = allIncomingMessages.map(message => {
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

  const mapAllOutGoingMessages = allOutGoingMessages => {
    // Ensure there are messages to render  
    if (allOutGoingMessages.length > 0) {
      const message = allOutGoingMessages.map(message => {
        return (
          <OutGoingMessage
            message = {message}
          />
        )
      });

      return message;
    } 
  };


  return (
    <footer className="chat-box">
      <h4>Messages</h4>
      <div>
        { mapAllIncomingMessages(allIncomingMessages) }
      </div>

      <div>
        { mapAllOutGoingMessages(allOutGoingMessages) }
      </div>

      <form onSubmit={ sendMessage }>
        <input type="text" id="message" name="message" onChange={changeHandler} value={chatBoxMessage}/>
        <input type="submit" value="Submit" />
      </form>
    </footer>
  );
};