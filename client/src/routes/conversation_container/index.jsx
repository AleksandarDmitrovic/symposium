import SortBy from "./SortBy"
import ConversationList from "./ConversationList"
import { useEffect, useState } from "react"
import axios from 'axios';

import NewRoomButton from "../rooms/NewRoomButton";

export default function Conversation(props) {

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios.get('/api/conversations').then((res) => {
      setConversations(res.data.conversation)
    })
  }, []);
  
  return (
    <article>
      <NewRoomButton
      history={props.history}
      />
      <SortBy />
      <ConversationList 
        conversations={conversations}
        history={props.history}
      />
    </article>
    
  )
};