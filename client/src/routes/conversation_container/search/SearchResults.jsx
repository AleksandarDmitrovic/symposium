import Cover from './Cover';

export default function SearchResults(props) {

  const { results } = props;

  return results.map(podcast => {
    return (
      <Cover 
        key={podcast.collectionId} 
        {...podcast}
        state = {props.state} 
      />
    );
  });

  // const podcastResults = results.map(podcast => {
  //   return (
  //     <li>
  //       <button><Cover key={podcast.collectionId} {...podcast} /></button>
  //     </li>
  //   );
  // });

//   return (
//     <ul>{podcastResults}</ul>
//   );
}
