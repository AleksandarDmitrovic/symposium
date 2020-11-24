import { useState, useEffect } from 'react';

import TopNav from './TopNav';
import Call from './Call';
import ChatBox from './ChatBox';
import Info from './Info';
import EmbedPodcast from './EmbedPodcast'

import './room.scss';

import axios from 'axios';

export default function Room(props) {
const [conversation, setConversation] = useState([{}]);
const [category, setCategory] = useState("");
const [timer, setTimer] = useState(false);
const roomID =  props.match.params.roomID;


const changeTimer = (newValue) => {
  setTimer(newValue)
};

useEffect(() => {
  axios.get(`/api/conversations/${roomID}`).then((res) => {
    setConversation(res.data.conversation)
    const categoryID = res.data.conversation[0].category_id;
    
    axios.get(`/api/categories/${categoryID}`).then((res) => {
      setCategory(res.data.categoryName.name)
    })
    
  })
}, [roomID]);

  return (
    <article className="room">

      <TopNav 
      creatorID = {conversation[0].creator_id}
      history = {props.history}
      timer = {timer}
      />

      <div className="main">
        <div className="side-bar">
          <Info 
            title = {conversation[0].title}
            description = {conversation[0].description}
            podcast_name = {conversation[0].podcast_name}
            episode_title = {conversation[0].podcast_episode_title}
            category = {category}
            podcast_starts_at = {conversation[0].podcast_starts_at}
            podcast_ends_at = {conversation[0].podcast_ends_at}
            podcast_image = {conversation[0].podcast_image}
            url = {props.history.location.pathname}
          />
          <EmbedPodcast 
            embed_title = {conversation[0].podcast_episode_title}
            embed_url = {conversation[0].podcast_episode_embed_url}
          />
        </div>
          <Call 
            roomID = {roomID} 
            timer = {changeTimer}
          />
        </div>
         {/* <ChatBox /> */}
    </article>
  );
}