import React, { useState } from 'react';

export default function ChatBox(props) {

  const [message, setMessage] = useState("");

  function sendMessage(event) {
    event.preventDefault();
    // clear message form
    setMessage("")
    console.log('message', message);
  };

  function changeHandler(event) {
    setMessage(event.target.value);
  }

  return (
    <footer className="chat-box">
      <h4>Messages</h4>

      <div className="incoming-messages">
        <p>Username : This is an incoming message, class="incoming-messages"</p>
      </div>
      <div className="outgoing-messages" style={{'text-align': "right"}}>
        <p>Username : This is an outgoing message, class="outgoing-messages"</p>
      </div>
      <div className="outgoing-messages" style={{'text-align': "right"}}>
        <p>Username : This is an outgoing message, class="outgoing-messages"</p>
      </div>
      <div className="outgoing-messages" style={{'text-align': "right"}}>
        <p>Username : This is an outgoing message, class="outgoing-messages"</p>
      </div>
      <div className="incoming-messages">
        <p>Username : This is an incoming message, class="incoming-messages"</p>
      </div>

      <form onSubmit={ sendMessage }>
        <input type="text" id="message" name="message" onChange={changeHandler} value={message}/>
        <input type="submit" value="Submit" />
      </form>
    </footer>
  );
}