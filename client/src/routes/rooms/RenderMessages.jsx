import { useState } from 'react';

export default function RenderMessages(props) {

  let className = "";
  let style = {};

  //This is the sender ELSE it is the receiver
  if (props.userId === 'me') {
    className = 'outgoing-message style-right';
    style = {textAlign: 'right'};
  } else {
    className = 'incoming-message style-left';
  }

  return (
    <div>
      <p className={className} style={style}>{props.message}</p>
    </div>
  )
}