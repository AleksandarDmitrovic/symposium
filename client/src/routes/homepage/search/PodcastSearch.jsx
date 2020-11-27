import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import './searchBar.scss';
const axios = require('axios');

// PodcastSearch Component fetches podcast data from the Itunes API, passing down the results and the user input as props
export default function PodcastSearch(props) {
  const { changeEpisodeInfo } = props
  // Name to insert into Itunes API 
  const [term, setTerm] = useState("");
  // The results fetched from the API
  const [results, setResults] = useState([]);
  // The value of the selected podcast
  const [value, setValue] = useState("");
  const [feedUrl, setFeedUrl] = useState('');

  // Stores the setValue function to pass down as props
  const changeValue = val => {
    setValue(val);
  }

   useEffect(() => {
    axios.get(`/api/itunes/${term}`).then(response => {
      setResults([...response.data])
    })
    .catch(err => console.log('Error: ', err));
  }, [term]);

  useEffect(() => {
    let url = encodeURIComponent(feedUrl);
    axios.get(`/api/episodes/${url}`).then(res => {
      changeEpisodeInfo(res.data)
    })
    .catch(err => console.log('Error: ', err));
  }, [feedUrl, changeEpisodeInfo]);

  return (
      <div>
        <SearchBar 
          onSearch={term => setTerm(term)}
          changeValue = {changeValue}
          value = {value}
        />
        <SearchResults 
          results={results}
          state={props.state}
          changeValue = {changeValue}
          changePodcastInfo = {props.changePodcastInfo}
          changeInput = {props.changeInput}
          setFeedUrl={setFeedUrl}
        />
      </div>
  );
}