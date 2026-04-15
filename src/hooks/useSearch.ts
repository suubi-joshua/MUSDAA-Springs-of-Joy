/**
 * useSearch hook - manages hymn search functionality
 */

import { useState, useCallback, useRef } from 'react';
import { Hymn } from '../types';
import { searchHymns } from '../db/database';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Hymn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const hymns = await searchHymns(searchQuery);
      setResults(hymns);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);

    // Debounce search by 300ms
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(text);
    }, 300);
  }, [performSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    results,
    loading,
    error,
    handleSearch,
    clearSearch,
  };
}
