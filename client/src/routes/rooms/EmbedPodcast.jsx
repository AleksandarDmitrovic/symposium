import './room.scss';

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/src/styles.scss';

export default function EmbedPodcast (props) {

  const title = props.class === 'footer-player' ? `Podcast of the Day: ${props.title}` : props.title;
  const volume = props.class === 'convo-card-player' ? [] : [RHAP_UI.VOLUME];


export default function EmbedPodcast (props) {
  return (
    <div className="embed-video">
      {/* <h4 className="embed-video-title">{props.title}</h4> */}
      <AudioPlayer
        className={`embed-video-audio-player" ${props.class}`}
        src={props.embed_url}
        header={title}
        footer={props.episode}
        showJumpControls={false}
        customVolumeControls={volume}
        customAdditionalControls={[]}
        autoPlayAfterSrcChange={false}
        layout="stacked-reverse"
      />
    </div>
  );
}