import { useEffect, useCallback } from "react";
import { TextField } from '@material-ui/core';
import useDebounce from "./hooks/useDebounce";

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
    if (event.target) { event.target.select() };
  }

  useEffect(() => {
    if (document.getElementsByClassName('result-container')[1] && term.length === 0) {
      document.getElementById('episode-list').style.visibility = 'hidden';
      document.getElementById('display-episode').style.visibility = 'hidden';
    }
    onSearch(term);
  }, [term, onSearch]);

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
