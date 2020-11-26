import { useEffect, useCallback } from "react";

import useDebounce from "./hooks/useDebounce";

import { TextField } from '@material-ui/core';

export default function SearchBar(props) {

  // Value state passed down from PodcastSearch Component
  const value = props.value

  //* useDebounce hook use commented out. If re-implemented, change all instances of "value" to "term" in useCallback and useEffect
  // Custom Hook - wait 400 ms until making the search for results
  // const term = useDebounce(value, 0);

  // onSearch is passed down from PodcastSearch and sets the term state
  // useCallback memoizes the function to run whenever debounced term changes
  const onSearch = useCallback(props.onSearch, [value]);

  const handleFocus = (event) => event.target.select();

  useEffect(() => {
    if (document.getElementsByClassName('result-container')[1]) {
      if (document.getElementsByClassName('result-container')[1].style.visibility === 'visible' && value.length === 0) {
        document.getElementById('episode-list').style.visibility = 'hidden';
        document.getElementById('display-episode').style.visibility = 'hidden';
      }
    }
    onSearch(value);
  }, [value, onSearch]);

  return (
    <section className="search">
      <form className="search-bar" onSubmit={event => event.preventDefault()}>
        <TextField
          label="PODCAST"
          className="selected-podcast"
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
        />
      </form>
    </section>
  );
}
