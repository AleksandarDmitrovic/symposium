import Cover from './Cover';

import InfiniteScroll from 'react-infinite-scroller';

export default function SearchResults(props) {

  // props.results passed down from PodcastSearch, containing podcast info from the Itunes API
  const { results } = props;


  const test = results.map(podcast => {
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
  console.log('test', test)

    // return (
    //   <InfiniteScroll
    //     pageStart={0}
    //     // loadMore={loadFunc}
    //     hasMore={true}
    //     loader={<div className="loader" key={0}>Loading ...</div>}
    //     >
    //     <div>
    //      {test} 
    //     </div>
        
    //   </InfiniteScroll>
    // );

    return (
      <div class='container'>
        {test}
      </div>
    )
  
}
