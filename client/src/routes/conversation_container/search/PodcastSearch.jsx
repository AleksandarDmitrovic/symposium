import { Fragment, useState, useEffect } from "react";

import SearchBar from "./SearchBar";
import SearchResults from "../SearchResults";

const axios = require('axios');

export default function PodcastSearch(props) {

  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const url = `https://itunes.apple.com/search?term=${term}&entity=podcast`;
    axios.get(url).then(response => {
      setResults([...response.data.results])
    })
    .catch(err => console.log('Error: ', err));
  }, [term])

  return (
    <Fragment>
      <div>
        <SearchBar onSearch={term => setTerm(term)} />
        <SearchResults results={results} />
      </div>
    </Fragment>
  );
}