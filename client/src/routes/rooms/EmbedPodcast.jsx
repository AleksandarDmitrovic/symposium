// import { useEffect, useState, useRef } from 'react'

// export default function EmbedPodcast (props) {

//   // USE STATE
//   const [url, setUrl] = useState();
//   const myAudio = useRef();

//   useEffect(function() {    
//     setUrl(props.embed_url);
//     myAudio.current.load()
//   }, [props.embed_url]);

//   return (
//     <div className="embed-video">
//       <audio controls ref={myAudio}>
//         <source src={url} type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>
//     </div>
//   );
// }

import './room.scss';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

export default function EmbedPodcast (props) {
  return (
    <div className="embed-video">
      <h4 className="embed-video-title">{props.title}</h4>
      <AudioPlayer
        className="embed-video-audio-player"
        src={props.embed_url}
        showJumpControls={false}
        customAdditionalControls={[]}
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
}