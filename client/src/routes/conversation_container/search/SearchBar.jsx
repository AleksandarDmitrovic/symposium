import { useEffect, useCallback } from "react";

import useDebounce from "./hooks/useDebounce";

import { Input } from '@material-ui/core';

export default function SearchBar(props) {

  // Value state passed down from PodcastSearch Component
  const value = props.value
  // Custom Hook - wait 400 ms until making the 
  const term = useDebounce(value, 400);

  // onSearch is passed down from PodcastSearch and sets the term state
  // useCallback memoizes the function to run whenever debounced term changes
  const onSearch = useCallback(props.onSearch, [term]);

  useEffect(() => {
    onSearch(term);
  }, [term, onSearch]);

  return (
    <section className="search">
      <form className="search-bar" onSubmit={event => event.preventDefault()}>
        <Input
          className="selected-podcast"
          spellCheck="false"
          placeholder="Search Podcast"
          name="search"
          type="text"
          autoComplete='off'
          value={value}
          onChange={event => props.changeValue(event.target.value)}
        />
      </form>
    </section>
  );
}
