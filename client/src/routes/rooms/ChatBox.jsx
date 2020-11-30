import React, { useEffect, useState } from 'react';

import RenderMessages from './RenderMessages'

// Material-ui
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { TextField } from '@material-ui/core';


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
    if (allMessages.length === 0) {
      return "No messages to show";
    }
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

    <div className="chat-box">
      <Card className="chat-box-card" variant="outlined">
        <div className="chat-box-messages">
          <div>
            { mapMessages(allMessages) }
          </div>
        </div>
      </Card>
      <Card className="chat-box-form-card" variant="outlined">
        <form onClick = { sendMessage } className="chat-box-form">
          <TextField
              className="chat-box-form-text-field"
              label="message"
              name="message"
              type="text"
              autoComplete='off'
              value={chatBoxMessage}
              onChange={changeHandler}
            />
          <Button variant="contained" color="primary" className="chat-box-form-button">
            Send
          </Button>
        </form> 
      </Card>

    </div>
  );
};