import './room.scss';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';


export default function EmbedPodcast (props) {
  return (
    <div className="embed-video">
      <h4 className="embed-video-title">{props.title}</h4>
      <AudioPlayer
        className="embed-video-audio-player"
        layout="horizontal-reverse"
        src={props.embed_url}
        showJumpControls={false}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        autoPlayAfterSrcChange={false}
      />
    </div>
  );
}
