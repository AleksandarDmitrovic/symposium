import React from 'react';
import TopNav from './TopNav';
import Call from './Call';
import ChatBox from './ChatBox';

import './room-styles/room.scss';

export default function Room(props) {

  return (
    <main>
      <TopNav creator = {props.creator_id}/>
      <section id='call'>
        <Call roomID = {props.match.params.roomID}/>
      </section>
        <ChatBox />
    </main>
  );
}