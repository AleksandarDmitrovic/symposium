import { useState, useEffect, useCallback } from "react";

import useDebounce from "./hooks/useDebounce";

export default function SearchBar(props) {

  const [value, setValue] = useState("");
  const term = useDebounce(value, 400);

  const onSearch = useCallback(props.onSearch, [term]);

  useEffect(() => {
    onSearch(term);
  }, [term, onSearch]);

  return (
    <section className="search">
      <form className="search-bar" onSubmit={event => event.preventDefault()}>
        <input
          className="radius"
          spellCheck="false"
          placeholder="Search Podcast"
          name="search"
          autocomplete='off'
          type="text"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </section>
  );
}
