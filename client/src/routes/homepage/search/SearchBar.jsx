import { useEffect, useCallback } from "react";
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import useDebounce from "./hooks/useDebounce";
import '../form-styles/NewRoomForm.scss';

export default function SearchBar(props) {

  // Value state passed down from PodcastSearch Component
  const value = props.value

  //* If useDebounce hook commented out, change all instances of "value" to "term" in useCallback and useEffect
  // Custom Hook - wait 400 ms until making the search for results
  const term = useDebounce(value, 400);

  // onSearch is passed down from PodcastSearch and sets the term state
  // useCallback memoizes the function to run whenever debounced term changes
  const onSearch = useCallback(props.onSearch, [term]);

  const handleFocus = (event) => {
    if (event.target.select) { event.target.select() };
  }

  // Hide the episodes of the chosen podcast in the NewRoomForm if the search bar is empty
  useEffect(() => {
    if (document.getElementsByClassName('result-container')[1] && term.length === 0) {
      document.getElementById('episode-list').style.visibility = 'hidden';
      document.getElementById('display-episode').style.visibility = 'hidden';
    }
    onSearch(term);
  }, [term, onSearch]);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        width: props.resultWidth,
      }
    }
  }));

  const classes = useStyles();

  document.addEventListener('input', disableScroll) 
  
  // If user is viewing search results, disable scroll of body
  function disableScroll() {
    document.querySelector('body').style.overflow = 'hidden';
    document.removeEventListener('input', disableScroll)
  };

  useEffect(() => {
    const positioning = props.resultWidth === '330px' ? '135px' : '';
    if ( document.getElementsByClassName('result-container')[0]) {
      document.getElementsByClassName('result-container')[0].style.top = positioning;
    }
  }, [props.resultWidth])

  return (
    <section className="search">
      <form className="search-bar" onSubmit={event => event.preventDefault()}>
        <TextField
          InputIndicatorProps={{style: {background:'#8A2BE2'}}}
          label={props.label}
          className={classes.root}
          data-cy="search-bar"
          spellCheck="false"
          placeholder="Search Podcast"
          name="search"
          type="text"
          autoComplete='off'
          value={value}
          onChange={event => {
            props.changeValue(event.target.value);
          }}
          onClick={handleFocus}
          InputProps={{style: 
            {
              color: props.fontColor, 
              marginTop: '30px',
              fontFamily: "'Raleway', sans-serif"
            }
          }}
          InputLabelProps={{style: 
            {
              color: props.fontColor, 
              fontFamily: "'Raleway', sans-serif",
              fontSize: '1em'
            }
          }}
        />
      </form>
    </section>
  );
}
