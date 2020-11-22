import { useState, useEffect } from 'react';

import TopNav from './TopNav';
import Call from './Call';
import ChatBox from './ChatBox';
import Info from './Info';
import EmbedVideo from './Embedded-player'

import './room.scss';

import axios from 'axios';

export default function Room(props) {
const [conversation, setConversation] = useState([{}]);
const roomID =  props.match.params.roomID;


useEffect(() => {
  axios.get(`/api/conversations/${roomID}`).then((res) => {
    setConversation(res.data.conversation)
  })
}, [roomID]);



  return (
    <main>
      <TopNav creatorID = {conversation[0].creator_id}/>
      <section id='call'>
        <Call roomID = {roomID} />
        <EmbedVideo />
        <Info 
          title = {conversation[0].title}
          description = {conversation[0].description}
          podcast_name = {conversation[0].podcast_name}
          podcast_starts_at = {conversation[0].podcast_starts_at}
          podcast_ends_at = {conversation[0].podcast_ends_at}
          podcast_image = {conversation[0].podcast_image}
        />
      </section>
      <ChatBox />
    </main>
  );
}