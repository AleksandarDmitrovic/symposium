import { useEffect, useState } from "react"
import axios from 'axios';
import SortBy from "./SortBy"
import ConversationList from "./ConversationList"
import NewRoomButton from "./NewRoomButton";
import SideNav from "./SideNav";
import { Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import './conversation-styles/index.scss';

export default function Conversation(props) {

  // Array of all conversations returned by axios get request
  const [conversations, setConversations] = useState([]);

  // String of search params from sort bar
  const [searchParam, setSearchParam] = useState('conversations')

   // Keep track of if there are new conversations
   const [newConversations, setNewConversations] = useState(false)

  // Pass to sortby function so that it can update searchParam state
  function changeState(newState) {
    setSearchParam(newState)
  };

  useEffect(() => {
    axios.get(`/api/${searchParam}`).then((res) => {
      setConversations(res.data.conversation)
    })
  }, [searchParam]);

  useEffect(() => {
    // const webSocket = new WebSocket('ws://localhost:8000');
    const webSocket = new WebSocket('wss://the-symposium.herokuapp.com/');
    webSocket.onopen = event => {
      webSocket.send("ping")
    }
    webSocket.onmessage = event => {
      console.log("Message Received:", event.data); //Confirmation of connection
    }
    webSocket.onmessage = event => {
      const message = JSON.parse(event.data);

      if (message.type === "UPDATE_CONVERSATIONS") {
        console.log("we did it yay")
        setNewConversations(true);
      }
    }
    //Cleanup 
    return () => webSocket.close();

  }, [])
  
  // Clears new conversation message and reloads the page
  const clearNotifications = () => {
    setNewConversations(false);
    window.location.reload(false)

  }
  
  return ( 
    <main>
      <SideNav />
      <article className='homepage'>
        <div className='fixed'>
          <NewRoomButton
            history={props.history}
          />
          <SortBy 
            state={changeState}
          />
        {newConversations && 
        <Alert 
        severity="info"
        onClick={() => {clearNotifications()}}
        >
          <AlertTitle>New Conversations Available</AlertTitle>
          <Button>
  
          <strong>click here</strong>
          </Button>
        </Alert>
        }
        </div>
        <ConversationList 
          conversations={conversations}
          history={props.history}
        />
      </article>
    </main>
  )
};
