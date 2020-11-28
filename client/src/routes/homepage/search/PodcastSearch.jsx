import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { makeStyles, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import './searchBar.scss'
        
// PodcastSearch Component fetches podcast data from the Itunes API, passing down the results and the user input as props
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
  // Boolean tracking the search status to determine whether to show results or not
  const [searchDone, setSearchDone] = useState(false);

  // Find elements with given class name and hide them
  const hide = className => {
    Array.from(document.getElementsByClassName(className)).forEach(result => {
      result.style.visibility = 'hidden';
    });
  };
  
  // Stores the setValue function to pass down as props while checking to see if prev state of the search was blank
  const changeValue = val => {
    setValue(val);
    if(props.sortedBy){
      props.sortedBy(false)
    }
    if (searchDone) {
      setSearchDone(false);
      if (!document.getElementById('episode-list')) { 
        document.getElementsByClassName('result-container')[0].style.visibility = 'visible';
      } else {
        document.getElementsByClassName('result-container')[1].style.visibility = 'visible';
      }
    };
    // If user clicks outside search results, hide results
    document.addEventListener('click', pageClick);
    function pageClick(event){
      if (!event.target.attributes.class || event.target.attributes.class.value !== 'podcast-result') {
        hide('result-container');
        hide('spinner');
        document.removeEventListener('click', pageClick);
        setSearchDone(true);
      } 
    };
  };

  //If a user click the All or Category Sort buttons the podcast search value is set to ""
  const {sorted, setSorted} = props;
  useEffect(()=>{ 
    if(sorted){
      setValue("")
      setSorted(false)
    }
  }, [sorted,setSorted])

  // Spinner to show while waiting for API results to come back
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
      axios.get(`/api/itunes/${term}`).then(response => {
        setResults([...response.data])
        hide('spinner');
      })
      .catch(err => console.log('Error: ', err));
    };
  }, [term]);

  useEffect(() => {
    if (feedUrl.length > 0) {
      let url = encodeURIComponent(feedUrl);
      axios.get(`/api/episodes/${url}`).then(res => {
        if (changeEpisodeInfo) { changeEpisodeInfo(res.data) };
      })
      .catch(err => console.log('Error: ', err));
    }
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
          setSearchDone={setSearchDone}
        />
      </div>
  );
}