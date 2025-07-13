import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

export const useSearch = (data, options = {}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(data);

  const defaultOptions = {
    threshold: 0.3,
    keys: ['title', 'name', 'tags'],
    ...options
  };

  const fuse = new Fuse(data, defaultOptions);

  useEffect(() => {
    if (!query.trim()) {
      setResults(data);
      return;
    }

    const searchResults = fuse.search(query);
    setResults(searchResults.map(result => result.item));
  }, [query, data]);

  return { query, setQuery, results };
};