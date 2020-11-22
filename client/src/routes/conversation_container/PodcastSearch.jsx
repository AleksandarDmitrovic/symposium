import { Fragment, useState, useEffect } from "react";

import SearchBar from "./SearchBar";

const axios = require('axios');

export default function PodcastSearch(props) {

  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`https://itunes.apple.com/search?${term}&entity=podcast`).then(response => {
      console.log(response.data.results);
      setResults([...response.data.results])
    });
  }, [term])

  return (
    <Fragment>
      <div>
        <SearchBar onSearch={term => setTerm(term)} />
        <Results results={results} />
      </div>
    </Fragment>
  );
}