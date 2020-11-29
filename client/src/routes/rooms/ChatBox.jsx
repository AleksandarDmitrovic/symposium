import React, { useEffect, useState } from 'react';

import RenderMessages from './RenderMessages'

// Material-ui
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

export default function ChatBox(props) {

  const [chatBoxMessage, setChatBoxMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  // Material-ui
  // const classes = useStyles();


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

      <Button
        variant="contained"
        color="primary"
        className="chat-box-send-button"
        endIcon={<SendIcon/>}
        onClick={ sendMessage }
      >
        <input autocomplete="off" type="text" id="message" name="message" onChange={changeHandler} value={chatBoxMessage}/>
      </Button>
    </div>
  );
};