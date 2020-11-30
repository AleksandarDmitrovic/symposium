import './room.scss';

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/src/styles.scss';

export default function EmbedPodcast (props) {

  const title = props.class === 'footer-player' ? `Podcast of the Day: ${props.title}` : props.title;
  const volume = props.class === 'footer-player' ? [RHAP_UI.VOLUME] : [];
  const layout = props.class === 'room-player' ? 'horizontal-reverse' : 'stacked-reverse'

  return (
    <div className="embed-video">
      <AudioPlayer
        className={`embed-video-audio-player" ${props.class}`}
        src={props.embed_url}
        header={title}
        footer={props.episode}
        showJumpControls={false}
        customVolumeControls={volume}
        customAdditionalControls={[]}
        autoPlayAfterSrcChange={false}
        layout={props.layout || "horizontal-reverse"}
      />
    </div>
  );
}