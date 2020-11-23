import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
//! For Episode dropdown once up and running
// import Episodes from "./Episodes";
import './searchBar.scss'
const axios = require('axios');

// PodcastSearch Component fetches podcast data from the Itunes API, passing down the results and the user input as props
export default function PodcastSearch(props) {

  // Name to insert into Itunes API 
  const [term, setTerm] = useState("");
  // The results fetched from the API
  const [results, setResults] = useState([]);
  // The value of the selected podcast
  const [value, setValue] = useState("");
  //! For Episode dropdown once up and runninga
  // const [episodes, setEpisodes] = useState([{}]);
  // Specific podcast
  const [podcastName, setPodcastName] = useState([]);

  // Stores the setValue function to pass down as props
  const changeValue = val => {
    setValue(val);
  }

  useEffect(() => {
    const url = `https://itunes.apple.com/search?term=${term}&entity=podcast`;
    axios.get(url).then(response => {
      setResults([...response.data.results])

      console.log('image', response.data.results[0].artworkUrl100);
      console.log('genre', response.data.results[0].primaryGenreName);
      console.log('name', response.data.results[0].collectionName);

      // Make second api call for specific podcasts
      const feedUrl = response.data.results[0].feedUrl;
      const url =  `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`

      axios.get(url).then(response => {
        console.log('embed', response.data.items[0].title);
        console.log('embed', response.data.items[0].link);
        // console.log('embed', response.data.items);
        setPodcastName(response.data.items)
      })

    })
    .catch(err => console.log('Error: ', err));
  }, [term])

  //! For Episode dropdown once up and running
  // useEffect(() => {
  //   const url = `https://itunes.apple.com/search?term=${term}&entity=podcast`;
  //   axios.get(url).then(response => {
  //     setResults([...response.data.results])
  //     // Make second api call for specific podcasts
  //     const feedUrl = response.data.results[0].feedUrl;
  //     const url =  `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`
  //     axios.get(url).then(response => {
  //       // setEpisodes(response.data.items);
  //       props.changeEpisodes(response.data.items);
  //     })
  //   })
  //   .catch(err => console.log('Error: ', err));
  // }, [term]);

  return (
      <div>
        <SearchBar 
          onSearch={term => setTerm(term)}
          changeValue = {changeValue}
          value = {value}
        />
        {/* <select id='episode-list'>
          <option>Episode:</option>
          <Episodes 
            episodes = {episodes}
          />
        </select> */}
        <SearchResults 
          results={results}
          state={props.state}
          changeValue = {changeValue}
          changePodcastInfo = {props.changePodcastInfo}
          changeInput = {props.changeInput}
        />
      </div>
  );
}