import { useEffect, useState } from 'react';
import TopNav from './TopNav';
import Call from './Call';
import ChatBox from './ChatBox';
import Info from './Info';

import './room-styles/room.scss';

export default function Room(props) {

  return (
    <main>
      <TopNav creator = {props.creator_id}/>
      <section id='call'>
        <Call roomID = {props.match.params.roomID} />
        <Info 
          title = {props.title}
          description = {props.description}
          podcast_name = {props.podcast_name}
          podcast_starts_at = {props.podcast_starts_at}
          podcast_ends_at = {props.podcast_ends_at}
          podcast_image = {props.podcast_image}
        />
      </section>
        <ChatBox />
    </main>
  );
}