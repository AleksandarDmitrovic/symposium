import { useEffect, useState } from "react"
import axios from 'axios';
import SortBy from "./SortBy"
import ConversationList from "./ConversationList"
import NewRoomButton from "./NewRoomButton";
import SideNav from "./SideNav";
import { Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import './conversation-styles/index.scss';
import { io } from "socket.io-client";

export default function Conversation(props) {

  const [homepage, setHomepage] = useState();

  useEffect(() => {
    console.log('creating homepage connection');
    setHomepage(io.connect("/"));
    // const homepage = io.connect("/");

  }, [])
  
  // if(homepage) {
    
  //   homepage.on("new conversation available", () => {
  //     console.log("made it to index !!!!")
  //     setNewConversations(true)
  //   })
  // }
  useEffect(() => {
    if (homepage) {
      homepage.on("new conversation available", () => {
        console.log("made it to index !!!!")
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
      </article>
    </main>
  )
};
