export default function Cover(props) {

  return (
    <article className="podcast">
      <img className="podcast-thumbnail" src={props.artworkUrl100} alt="Cover" />
      <div className='podcast-list'>
        <div className="podacast-result">{props.collectionName}</div>
      </div>
    </article>
  );
}