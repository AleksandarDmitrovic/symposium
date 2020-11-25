import { useState } from 'react';

export default function RenderMessages(message) {

  const [className, setClassName] = useState();
  const [style, setStyle] = useState();

  if (message.sender === 'sender') {
    setClassName("outgoing-messages");
    setStyle({textAlign: "right"});
  } else {
    setClassName("incoming-messages");
  }


  return (
    <div>
      <div className={className} style={style}>
      </div>
    </div>
  )
}