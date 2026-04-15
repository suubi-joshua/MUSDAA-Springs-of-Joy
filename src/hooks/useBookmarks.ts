/**
 * useBookmarks hook - manages user bookmarks
 */

import { useState, useCallback, useEffect } from 'react';
import { Hymn } from '../types';
import {
  addBookmark,
  removeBookmark,
  getBookmarkedHymns,
  isHymnBookmarked,
} from '../db/database';

export function useBookmarks() {
  const [bookmarkedHymns, setBookmarkedHymns] = useState<Hymn[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load bookmarks on mount
  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const hymns = await getBookmarkedHymns();
      setBookmarkedHymns(hymns);
      setBookmarkedIds(new Set(hymns.map(h => h.id)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleBookmark = useCallback(
    async (hymn: Hymn) => {
      try {
        const isBookmarked = bookmarkedIds.has(hymn.id);

        if (isBookmarked) {
          await removeBookmark(hymn.id);
          setBookmarkedHymns(prev => prev.filter(h => h.id !== hymn.id));
          setBookmarkedIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(hymn.id);
            return newSet;
          });
        } else {
          await addBookmark(hymn.id);
          setBookmarkedHymns(prev => [hymn, ...prev]);
          setBookmarkedIds(prev => new Set(prev).add(hymn.id));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to update bookmark'
        );
      }
    },
    [bookmarkedIds]
  );

  const isBookmarked = useCallback(
    (hymnId: number) => bookmarkedIds.has(hymnId),
    [bookmarkedIds]
  );

  return {
    bookmarkedHymns,
    bookmarkedIds,
    loading,
    error,
    toggleBookmark,
    isBookmarked,
    loadBookmarks,
  };
}
