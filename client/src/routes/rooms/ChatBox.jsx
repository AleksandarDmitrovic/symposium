import React, { useEffect, useState } from 'react';

import RenderMessages from './RenderMessages'

import { Card } from '@material-ui/core';

export default function ChatBox(props) {

  const [chatBoxMessage, setChatBoxMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  function sendMessage(event) {
    event.preventDefault();

    // Updates message state triggering useEffect in Call.jsx
    props.setMessage(chatBoxMessage);

    // Updates allMessage state causing a rerender
    setAllMessages([...allMessages, { messageInfo: { message: chatBoxMessage, userId: 'me' } } ])

    // clear message form
    setChatBoxMessage("");
  };

  function changeHandler(event) {
    setChatBoxMessage(event.target.value);
  };

  useEffect(() => {
    if (Object.keys(props.newMessage).length !== 0) {
      setAllMessages([...allMessages, props.newMessage])
    }
  }, [props.newMessage]);


  const mapMessages = (allMessages) => {
    const messages = allMessages.map(message => {
      return (
        <RenderMessages
          message={message.messageInfo.message}
          userId={message.messageInfo.userId}
        />
      )
    });
    return messages;
  }

  
  return (

    <footer className="chat-box">
      <h4>Messages</h4>

      <div>
        { mapMessages(allMessages) }
      </div>

      <form onSubmit={ sendMessage }>
        <input type="text" id="message" name="message" onChange={changeHandler} value={chatBoxMessage}/>
        <input type="submit" value="Submit" />
      </form>
    </footer>
  );
};
