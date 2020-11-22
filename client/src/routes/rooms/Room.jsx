import { useEffect, useState } from 'react';
import TopNav from './TopNav';
import Call from './Call';
import ChatBox from './ChatBox';
import Info from './Info';

import axios from 'axios';

import './room-styles/room.scss';

export default function Room(props) {
  
  const convo = { creator_id: 1,  category_id: 1,  title: 'Test', description: 'test description', podcast_name: 'The cool podcast', podcast_starts_at: '16:44', podcast_ends_at: '18:50', podcast_image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'}

  return (
    <main>
      <TopNav creator = {props.creator_id}/>
      <section id='call'>
        <Call roomID = {props.match.params.roomID} />
        {/* <Info 
          title = {props.title}
          description = {props.description}
          podcast_name = {props.podcast_name}
          podcast_starts_at = {props.podcast_starts_at}
          podcast_ends_at = {props.podcast_ends_at}
          podcast_image = {props.podcast_image}
        /> */}
        <Info 
          title = {convo.title}
          description = {convo.description}
          podcast_name = {convo.podcast_name}
          podcast_starts_at = {convo.podcast_starts_at}
          podcast_ends_at = {convo.podcast_ends_at}
          podcast_image = {convo.podcast_image}
        />
      </section>
        <ChatBox />
    </main>
  );
}