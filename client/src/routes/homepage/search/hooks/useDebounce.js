import { useState, useEffect } from "react";

// This hook is used in the SearchBar Component and will wait until a user stops typing to fetch typeahead search results

export default function useDebounce(input, ms) {
  
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(input), ms);
    return () => clearTimeout(timeout);
  }, [input, ms]);

  return debounced;
}
