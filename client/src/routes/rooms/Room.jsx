import React from 'react';
import TopNav from './TopNav';
import Call from './Call';
import ChatBox from './ChatBox';

export default function Room(props) {

  return (
    <main>
      <TopNav creator = {props}/>
      <section>
        <Call roomID = {props.match.params.roomID}/>
      </section>
        <ChatBox />
    </main>
  );
}