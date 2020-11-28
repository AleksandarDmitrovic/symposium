
import { useEffect, useState, useRef } from "react"
import axios from 'axios';
import { io } from "socket.io-client";
import { Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import SortBy from "./SortBy"
import ConversationList from "./ConversationList"
import NewRoomButton from "./NewRoomButton";
import SideNav from "./SideNav";
import Footer from "./Footer";
import './conversation-styles/index.scss';

export default function Conversation(props) {

  // Set up for socket.io connection to notify users of new conversations 
  const [homepage, setHomepage] = useState();

  useEffect(() => {
    setHomepage(io.connect("/"));
  }, [])

  useEffect(() => {
    if (homepage) {
      homepage.on("new conversation available", () => {
        setNewConversations(true)
      })
    }
  }, [homepage])

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
  // Clears new conversation message and reloads the page
  const clearNotifications = () => {
    setNewConversations(false);
    window.location.reload(false)
  }

  useEffect(() => {
    if (newConversations) {
      document.getElementsByClassName('convo-list')[0].style.marginTop = '250px';
      document.getElementsByClassName('fixed')[0].style.height = '30vh';
    } else {
      document.getElementsByClassName('convo-list')[0].style.marginTop = '150px';
      document.getElementsByClassName('fixed')[0].style.height = '20vh';
    }
  }, [newConversations])
  
  return ( 
    <main>
      <SideNav />
      <article className='homepage'>
        <div className='fixed'>
          <NewRoomButton
            history={props.history}
            connection={homepage}
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
        <Footer />
      </article>
    </main>
  )
};
