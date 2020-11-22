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
    socketRef.current.emit('created a new room');
  }

  useEffect(() => {
    axios.get(`/api/${searchParam}`).then((res) => {
      setConversations(res.data.conversation)
    })
  }, [searchParam]);


  // SOCKET IO FOR HOMEPAGE
  const socketRef = useRef();
  const peersRef = useRef([]); 
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    socketRef.current = io.connect("/");
    socketRef.current.emit('connected to homepage');
 
    socketRef.current.on('all users connected to homepage', users => {

      if (users) {
        // We have no peers yet because we have just joined.
        const peers = []; 
        // iterate through each user in the room, creating a peer for each
        users.forEach(userID => {
          const peer = createPeer(userID, socketRef.current.id);
          peersRef.current.push({
            peerID: userID, // the socketID for person we just created a peer for
            peer // the peer object returned the from createPeer function
          });
          peers.push(peer);
        });
        // Update Peers State
        setPeers(peers);
      }
    });

    //* A PERSON ALREADY ON THE HOMEPAGE IS NOTIFIED THAT SOMEONE ELSE HAS JOINED
    socketRef.current.on('user connected to homepage', payload => {
      // Create a peer for the newcomer who just went to the homepage
      const peer = addPeer(payload.signal, payload.callerID);
      
      peersRef.current.push({
        peerID: payload.callerID,
        peer
      });
      // Update Peers State by adding the newly joined user to the existing array of participants
      setPeers(users => [...users, peer]);
    });

    //* THE JOINING USER GETS THEIR RESPONSE
    socketRef.current.on('receiving returned signal', payload => {
      const item = peersRef.current.find(p => p.peerID === payload.id);
      console.log('handshake has been created');
      item.peer.signal(payload.signal);
    })

    socketRef.current.on('there is a new room', () => {
      setNewRoom('new room');
    })
  }, [])

  function createPeer(userToSignal, callerID) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
    });

    // The newly constructed peer emits a signal immediately because we set initiator to true. This starts the peer-to-peer handshake
    peer.on('signal', signal => {
      // Emit signal down to the server, sending an object with the userID of everyone already on the homepage, the joining user's ID, and the actual signal data
      socketRef.current.emit('sending signal', { userToSignal, callerID, signal })
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID) {
    // initiator set to false so signal is not fired on creation of Peer
    const peer = new Peer({
      initiator: false,
      trickle: false,
    });

    // This will fire when it is notified that someone wants to make a connection with it
    peer.on('signal', signal => {
      // Receives incoming signal, and sends a signal back out to the server, which sends a signal to the callerID that called 
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    // triggers the on 'signal' command above
    peer.signal(incomingSignal);

    return peer;
  }

  
  
  return (
    <article>

      <NewRoomButton
        history={props.history}
        changeState={changeNewRoomState}
      />
    
      <SortBy 
        changeState={changeSearchParamState}
      />

      <ConversationList 
        conversations={conversations}
        history={props.history}
      />
    </article>
    
  )
};