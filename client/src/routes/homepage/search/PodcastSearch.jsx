import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { makeStyles, CircularProgress } from '@material-ui/core';
import './searchBar.scss'
import axios from 'axios';

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
    if (prevTerm && prevTerm.length <= 2) {
      if (!document.getElementById('episode-list')) { 
        document.getElementsByClassName('result-container')[0].style.visibility = 'visible';
      } else {
        document.getElementsByClassName('result-container')[1].style.visibility = 'visible';
      }
    };
      // If user clicks outside search results, hide results
      document.addEventListener('click', pageClick);

      function pageClick(event){
        if (event.target.attributes.class && event.target.attributes.class.value !== 'podcast-result') {
          Array.from(document.getElementsByClassName('spinner')).forEach(result => {
            result.style.visibility = 'hidden';
          });
          // setValue('');
          Array.from(document.getElementsByClassName('result-container')).forEach(result => {
            result.style.visibility = 'hidden';
          });
          document.removeEventListener('click', pageClick);
        }
      };
    };

    // Spinner loader to show while waiting for API results to come back
    const useStyles = makeStyles((theme) => ({
      root: {
        visibility: 'hidden',
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(3),
        },
      },
    }));
    const spin = useStyles();
    const spinner = (
      <div className={`${spin.root} spinner`}>
        <CircularProgress color="secondary" />
      </div>
    );

   useEffect(() => {
    if (term.length > 0) { 
      if (document.getElementById('episode-list')) {
        document.getElementsByClassName('spinner')[1].style.visibility = 'visible';
      } else {
        document.getElementsByClassName('spinner')[0].style.visibility = 'visible';
      }
    };
    axios.get(`/api/itunes/${term}`).then(response => {
      document.getElementById('spinner').style.visibility = 'hidden';
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
        <div className='search-spinner'>
          <SearchBar 
            onSearch={term => setTerm(term)}
            changeValue = {changeValue}
            value = {value}
          />
          {spinner}
        </div>
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