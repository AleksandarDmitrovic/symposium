export default function EmbedPodcast (props) {

  console.log(props.embed_url);

  return (
    <div className="embed-video">
      <h1>{props.embed_title}</h1>
      <audio controls>
        <source src="https://traffic.libsyn.com/secure/joeroganexp/p1568.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
