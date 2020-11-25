import React, { useEffect, useState } from 'react';

import IncomingMessage from './IncomingMessage'
import OutGoingMessage from './OutGoingMessage'
import RenderMessages from './RenderMessages'

export default function ChatBox(props) {

  const [chatBoxMessage, setChatBoxMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  function sendMessage(event) {
    event.preventDefault();
    props.setMessage(chatBoxMessage);

    setAllMessages([...allMessages, { message: chatBoxMessage, userId: 'me' }])

    // clear message form
    setChatBoxMessage("");
  };

  function changeHandler(event) {
    setChatBoxMessage(event.target.value);
  };

  useEffect(() => {
    console.log('props', props.newMessage);
    if (Object.keys(props.newMessage).length !== 0) {
      setAllMessages([...allMessages, props.newMessage])
    }
  }, [props.newMessage]);


  console.log('all messages', allMessages);

  
  return (
    <footer className="chat-box">
      <h4>Messages</h4>

      <form onSubmit={ sendMessage }>
        <input type="text" id="message" name="message" onChange={changeHandler} value={chatBoxMessage}/>
        <input type="submit" value="Submit" />
      </form>
    </footer>
  );
};

