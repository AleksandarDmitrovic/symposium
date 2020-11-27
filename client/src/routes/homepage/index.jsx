import { useEffect, useState } from "react"
import axios from 'axios';


import SortBy from "./SortBy"
import ConversationList from "./ConversationList"
import NewRoomButton from "./NewRoomButton";
import SideNav from "./SideNav";
import NotificationBell from "./MagicBell";
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
// import { Alert, AlertTitle } from '@material-ui/lab';
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
    const webSocket = new WebSocket('ws://localhost:8000');
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
        // const id = message.id
        // const interview = message.interview
        // dispatch({ type: SET_INTERVIEW, id, interview })
      }
    }
    //Cleanup 
    return () => webSocket.close();

  }, [])
  
  const clearNotifications = () => {
    setNewConversations(false);
    window.location.reload(false)

  }
  
  return (
    <>
      {newConversations && <NotificationBell
            className='css-x1jtea-Bell'
            onClick={() => {clearNotifications()}}
          ></NotificationBell>
      }
      
    <main>
      <SideNav />
      <article class='homepage'>
        <div className='fixed'>
          <NewRoomButton
            history={props.history}
          />
          <SortBy 
            state={changeState}
          />
        </div>
        {/* {newConversations && 
        <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
      </Alert>
      } */}
        <ConversationList 
          conversations={conversations}
          history={props.history}
        />
      </article>
    </main>
    </>
  )
};
