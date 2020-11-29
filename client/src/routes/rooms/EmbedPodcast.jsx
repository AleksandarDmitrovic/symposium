import './room.scss';

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/src/styles.scss';

export default function EmbedPodcast (props) {

  let title = props.title;

  if (props.class === 'footer-player') {
    title = `Podcast of the Day: \xa0\xa0 ${props.title}`;
  } else if (props.class === 'convo-card-player') {
    title = `${props.title} \xa0\xa0\xa0 | \xa0\xa0\xa0 Category: ${props.category}`;
  }

  const volume = props.class === 'convo-card-player' ? [] : [RHAP_UI.VOLUME];

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
        layout={props.layout || "horizontal-reverse"}
      />
    </div>
  );
}