import React from 'react';

export default function Info(props) {
  const altImage = "https://images.unsplash.com/photo-1556761175-129418cb2dfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80";

  return (
    <div className='info'>
      <img src={props.podcast_image} alt={altImage} />
      <ul>
        <li><b>Title : </b>{props.title}</li>
        <li><b>Description : </b>{props.description}</li>
        <li><b>Podcast : </b>{props.podcast_name}</li>
        <li><b>Timestamp : </b>{props.podcast_starts_at} - {props.podcast_ends_at}</li>
        <li><b>Category : </b>{props.category}</li>
      </ul>
    </div>
  )
}