import { useEffect, useState, useRef } from "react"
import SortBy from "./SortBy"
import ConversationList from "./ConversationList"
import NewRoomButton from "./NewRoomButton";
import SideNav from "./SideNav";
import './conversation-styles/index.scss';
import axios from 'axios';

export default function Conversation(props) {

  // Array of all conversations returned by axios get request
  const [conversations, setConversations] = useState([]);

  // String of search params from sort bar
  const [searchParam, setSearchParam] = useState('conversations')

  // Pass to sortby function so that it can update searchParam state
  function changeState(newState) {
    setSearchParam(newState)
  };

  
  useEffect(() => {
    axios.get(`/api/${searchParam}`).then((res) => {
      setConversations(res.data.conversation)
    })
  }, [searchParam]);
  
  return (
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
        <ConversationList 
          conversations={conversations}
          history={props.history}
        />
      </article>
    </main>
  )
};
