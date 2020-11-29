import './room.scss';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';


export default function EmbedPodcast (props) {
  return (
    <div className="embed-video">
      <h6 className="embed-video-title">{props.title}</h6>
      <AudioPlayer
        src={props.embed_url}
        showJumpControls={false}
        customAdditionalControls={[]}
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
}
