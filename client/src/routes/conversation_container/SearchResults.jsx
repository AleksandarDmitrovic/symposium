import Cover from './Cover';

export default function SearchResults(props) {

  const { results } = props;

  console.log('RESULTS', results)

  return results.map(podcast => {
    return <Cover key={podcast.collectionId} {...podcast} />;
  });
}
