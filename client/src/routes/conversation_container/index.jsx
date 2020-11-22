import SortBy from "./SortBy"
import ConversationList from "./ConversationList"
import { useEffect, useState, useRef } from "react"
import axios from 'axios';

import io from "socket.io-client";
import Peer from "simple-peer";


import NewRoomButton from "../rooms/NewRoomButton";

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


  // SOCKET IO FOR HOMEPAGE
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/")
    socketRef.current.emit('at homepage');
  }, [])
  
  return (
    <article>

      <NewRoomButton
        history={props.history}
      />
    
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