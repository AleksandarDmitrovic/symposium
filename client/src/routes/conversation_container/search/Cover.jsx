export default function Cover(props) {

  // Grabs category name for creating the form
  // console.log('Category = ', props.primaryGenreName)

  console.log('props.state in Cover', props.state)

  const name = props.collectionName
  const term = name.split(' ').join('+');

  return (
    <button onClick={() => props.state(`/conversations/podcast/${term}`)} className="podcast">
      <img className="podcast-thumbnail" src={props.artworkUrl60} alt="Cover" />
      <div className='podcast-list'>
        <div className="podacast-result">{props.collectionName}</div>
      </div>
    </button>
  );
}