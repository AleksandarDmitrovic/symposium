import { useState } from 'react';

export default function Cover(props) {

  // For hiding and showing episode dropdown in form:
  // const [visible, setVisible] = useState('visible');

  // Object that the will be given to the changePodcastInfo prop passed down from NewRoomForm Component
  const podcastInfo = {
    podcast_name: props.collectionName,
    podcast_image: props.artworkUrl100,
    category: props.primaryGenreName
  }

  // Name of Podcast to display on input field and send to server for query
  const name = props.collectionName

  const selectPodcast = name => {
    // Hide the remaining search results. Convert into an array to iterate through 
    Array.from(document.getElementsByClassName('podcast')).forEach(result => {
      result.style.display = 'none';
    });
    if (props.state) {
      // Remove spaces from podcast name to provide valid route for searchParams
      const term = name.split(' ').join('+');
      // Set the searchParams state using props passed all th way down from Index Component
      props.state(`/conversations/podcast/${term}`);
    } else {
      props.changePodcastInfo(podcastInfo);
      // For hiding and showing episode dropdown in form:
      // document.getElementById('episode-list').style.visibility = visible;
      // setVisible('visible')
    }
    // Fill the input field with selected podcast name using props passed down from PodcastSearch
    props.changeValue(name);
  };

  return (
    <article onClick={() => selectPodcast(name)} className="podcast">
      <img className="podcast-thumbnail" src={props.artworkUrl60} alt="Cover" />
      <div className='podcast-list'>
        <div className="podacast-result">{name}</div>
      </div>
    </article>
  );
}