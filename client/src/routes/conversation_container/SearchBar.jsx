import { useState, useEffect, useCallback } from "react";

import useDebounce from "../../hooks/useDebounce";

export default function SearchBar(props) {

  const [value, setValue] = useState("");
  const term = useDebounce(value, 400);

  let onSearch = props.onSearch;

  onSearch = useCallback((event) => {
    console.log('EVENT', event);
  }, [term]);

  useEffect(() => {
    onSearch(term);
  }, [term, onSearch]);

  return (
    <section className="search">
      <form className="search__form" onSubmit={event => event.preventDefault()}>
        <input
          className="radius"
          spellCheck="false"
          placeholder="Search Artists"
          name="search"
          type="text"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </section>
  );
}
