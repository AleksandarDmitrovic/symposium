import SortBy from "./SortBy"
import ConversationList from "./ConversationList"
import { useEffect, useState } from "react"
import axios from 'axios';

export default function Conversation(props) {

  const [conversations, setConversations] = useState([]);
  const [searchParam, setSearchParam] = useState('conversations')

  // Pass to sortby function so that it can update searchParam state
  function changeState(newState) {
    console.log('changing state');
    setSearchParam(newState)
  };

  useEffect(() => {
    console.log('useEffect', searchParam);
    axios.get(`/api/${searchParam}`).then((res) => {
      setConversations(res.data.conversation)
    })
  }, [searchParam]);
  
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