import SortBy from "./SortBy"
import ConversationList from "./ConversationList"
import { useEffect, useState } from "react"
import axios from 'axios';

export default function Conversation(props) {

  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    axios.get('/api/conversations').then((res) => {
      setConversation(res.data.conversation)
    })
  }, []);
  
  return (
    <article>
      <SortBy />
      <ConversationList 
        conversations={conversation}
      />
    </article>
    
  )
};