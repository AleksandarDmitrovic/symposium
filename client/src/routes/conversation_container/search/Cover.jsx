export default function Cover(props) {

  //* Object that the searchBar will return for the creating room form
  // const podcastInfo = {
  //   podcast_name: props.collectionName,
  //   podcast_image: props.artworkUrl60,
  //   category: props.primaryGenreName
  // }

  // Remove spaces from podcast name to provide valid route for searchParams
  const name = props.collectionName
  const term = name.split(' ').join('+');

  return (
    <article onClick={() => props.state(`/conversations/podcast/${term}`)} className="podcast">
      <img className="podcast-thumbnail" src={props.artworkUrl60} alt="Cover" />
      <div className='podcast-list'>
        <div className="podacast-result">{props.collectionName}</div>
      </div>
    </article>
  );
}