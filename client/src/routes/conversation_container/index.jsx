import SortBy from "./SortBy"
import ConversationList from "./ConversationList"
import { useEffect, useState } from "react"
import axios from 'axios';

export default function Conversation(props) {

  const [conversations, setConversations] = useState([]);
  const [test, setTest] = useState('All');

  function changeState(newState) {
    setTest(newState)
  };

  useEffect(() => {
    axios.get('/api/conversations').then((res) => {
      setConversations(res.data.conversation)
    })
  }, []);
  
  return (
    <article>
      <SortBy 
        state={changeState}
      />
      <ConversationList 
        conversations={conversations}
        history={props.history}
      />
    </article>
    
  )
};