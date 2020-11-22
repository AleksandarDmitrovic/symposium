import { useState, useEffect, useCallback } from "react";

import useDebounce from "./hooks/useDebounce";

export default function SearchBar(props) {

  const value = props.value

  const term = useDebounce(value, 400);

  const onSearch = useCallback(props.onSearch, [term]);

  useEffect(() => {
    onSearch(term);
  }, [term, onSearch]);

  return (
    <section className="search">
      <label for='search-bar'>Podcast: </label>
      <form className="search-bar" onSubmit={event => event.preventDefault()}>
        <input
          id="selected-podcast"
          spellCheck="false"
          placeholder="Search Podcast"
          name="search"
          autocomplete='off'
          type="text"
          value={value}
          onChange={event => props.changeValue(event.target.value)}
        />
      </form>
    </section>
  );
}
