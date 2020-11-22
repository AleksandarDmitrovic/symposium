import React from "react";

export default function SearchResults(props) {

  const { results } = props;

  console.log('RESULTS', results)

  return results.map(album => {
    // return <Album key={album.collectionId} {...album} />;
  });
}
