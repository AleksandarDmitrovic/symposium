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

  // State for when user creates new room
  const [newRoom, setNewRoom] = useState()

  // Pass to sortby so that it can update searchParam state
  function changeSearchParamState(newState) {
    setSearchParam(newState)
  };
  // Pass to NewRoomButton so that it can update newRoom state
  function changeNewRoomState(newState) {
    setNewRoom(newState);
  }

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
        changeState={changeSearchParamState}
      />
    
      <SortBy 
        changeState={changeNewRoomState}
      />

      <ConversationList 
        conversations={conversations}
        history={props.history}
      />
    </article>
    
  )
};