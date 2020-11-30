import './room.scss';

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/src/styles.scss';

export default function EmbedPodcast (props) {

  let title = props.title;
  let episode = props.episode;

  if (props.class === 'footer-player') {
    title = `Podcast of the Day: \xa0\xa0 ${props.title} \xa0\xa0\xa0 | \xa0\xa0\xa0 ${props.episode}`;
    episode = null;
  } else if (props.class === 'convo-card-player') {
    title = `${props.title} \xa0\xa0\xa0 | \xa0\xa0\xa0 Category: ${props.category}`;
  }

  const volume = props.class === 'footer-player' ? [RHAP_UI.VOLUME] : [];
  const layout = props.class === 'room-player' ? 'horizontal-reverse' : 'stacked-reverse'

  return (
    <div className="embed-video">
      <AudioPlayer
        className={`embed-video-audio-player" ${props.class}`}
        src={props.embed_url}
        header={title}
        footer={episode}
        showJumpControls={false}
        customVolumeControls={volume}
        customAdditionalControls={[]}
        autoPlayAfterSrcChange={false}
        layout={props.layout || "horizontal-reverse"}
      />
    </div>
  );
}