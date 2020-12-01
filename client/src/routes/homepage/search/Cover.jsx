export default function Cover(props) {

  // Object that the will be given to the changePodcastInfo prop passed down from NewRoomForm Component
  //* Commented out for Symposium 2.0
  // const podcastInfo = {
  //   podcast_name: props.collectionName,
  //   podcast_image: props.artworkUrl600,
  //   category: props.primaryGenreName,
  // }
  let podcastInfo;
  if (props.name === 'HISTORY This Week') {
    podcastInfo = {
      podcast_name: 'HISTORY This Week',
      podcast_image: 'https://is4-ssl.mzstatic.com/image/thumb/Podcasts124/v4/62/ef/05/62ef0542-e871-4ec7-b3f6-c2bd5582f273/mza_7664804343855747667.jpg/600x600bb.jpg',
      category: 'History',
    }
  } else {
    podcastInfo = {
      podcast_name: 'Lex Fridman Podcast',
      podcast_image: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts114/v4/62/15/8e/62158efc-a4f7-d4ec-ebab-05c9a30ed25e/mza_6076293181799511311.png/600x600bb.jpg',
      category: 'Arts',
    }
  }
  

  // Name of Podcast to display on input field and send to server for query
   //* Commented out for Symposium 2.0
  // const name = props.collectionName
  const name = props.name

  const selectPodcast = name => {
    // Hide the remaining search results. Convert into an array to iterate through 
    Array.from(document.getElementsByClassName('result-container')).forEach(result => {
      result.style.visibility = 'hidden';
    });
    if (props.state) {
      // Remove spaces from podcast name to provide valid route for searchParams
      const term = name.split(' ').join('+');
      // Set the searchParams state using props passed all th way down from Index Component
      props.state(`/conversations/podcast/${term}`);
    } else {
      props.changePodcastInfo(podcastInfo);
    }
    // Fill the input field with selected podcast name using props passed down from PodcastSearch
    props.changeValue(name);
    props.setFeedUrl(props.feedUrl);
    props.setSearchDone(true);
    document.querySelector('body').style.overflow = 'auto';
  };

  return (
     //* Commented out for Symposium 2.0
    // <article onClick={() => selectPodcast(name)} className="podcast">
    //   <img className="podcast-thumbnail" src={props.artworkUrl60} alt="Cover" />
    //   <div className='podcast-list'>
    //     <div className="podcast-result">{name}</div>
    //   </div>
    // </article>
    <article onClick={() => selectPodcast(name)} className="podcast">
      <img className="podcast-thumbnail" src={props.image} alt="Cover" />
      <div className='podcast-list'>
        <div className="podcast-result">{name}</div>
      </div>
  </article>
  );
}