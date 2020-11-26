import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import './searchBar.scss'
const axios = require('axios');

export default function PodcastSearch(props) {
  const { changeEpisodeInfo } = props
  // Name to insert into Itunes API 
  const [term, setTerm] = useState("");
  // The results fetched from the API
  const [results, setResults] = useState([]);
  // The value of the selected podcast
  const [value, setValue] = useState("");
  // The value of the feedUrl used to get the stream of the podcast
  const [feedUrl, setFeedUrl] = useState('');

  // Track the prev state of term to check if results need to be visible or hidden
  const prevTermRef = useRef();
  useEffect(() => {
    prevTermRef.current = term;
  }, [term]);
  const prevTerm = prevTermRef.current;
  
  // Stores the setValue function to pass down as props while checking to see if prev state of the search was blank
  const changeValue = val => {
    setValue(val);
    if (prevTerm.length <= 1) {
      Array.from(document.getElementsByClassName('result-container')).forEach(result => {
        if (!document.getElementById('episode-list')) { result.style.visibility = 'visible' };
      });
    }
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