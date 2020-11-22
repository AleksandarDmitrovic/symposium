import React from 'react';

export default function Info(props) {

  return (
    <div class='info'>
      <ul>
        <li>Title: {props.title}</li>
        <li>Description: {props.description}</li>
        <li>Podcast: {props.podcast_name}</li>
        <li>Timestamp: {props.podcast_starts_at} - {props.podcast_ends_at}</li>
      </ul>
    </div>
  )
}