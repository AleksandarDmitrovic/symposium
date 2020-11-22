import Cover from './Cover';

export default function SearchResults(props) {

  // props.results passed down from PodcastSearch, containing podcast info from the Itunes API
  const { results } = props;

  const scrollableResults = results.map(podcast => {
    return (
      <Cover 
        key={podcast.collectionId} 
        {...podcast}
        state = {props.state} 
        changeValue = {props.changeValue}
        changePodcastInfo = {props.changePodcastInfo}
      />
    )
  });

  return (
    <div className='container'>
      {scrollableResults}
    </div>
  );
}
