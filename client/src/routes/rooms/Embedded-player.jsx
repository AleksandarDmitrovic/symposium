import { useEffect, useState, useRef } from 'react'

export default function EmbedPodcast (props) {

  // USE STATE
  const [url, setUrl] = useState();
  const myAudio = useRef();

  useEffect(function() {    
    setUrl(props.embed_url);
    myAudio.current.load()
  }, [props.embed_url]);

  
  return (
    <div className="embed-video">
      <audio controls ref={myAudio}>
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
