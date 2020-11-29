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
        width: '40ch',
      },
    },
  }));

  const classes = useStyles();

  return (
    <section className="search">
      <form className="search-bar" onSubmit={event => event.preventDefault()}>
        <TextField
          label={props.label}
          className={classes.root}
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
          InputProps={{style: {color: 'white'}}}
          InputLabelProps={{style: {color: 'white'}}}
        />
      </form>
    </section>
  );
}
