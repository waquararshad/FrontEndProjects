import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    const stored = localStorage.getItem('texttrace-bookmarks');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('texttrace-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (id) => {
    if (!bookmarks.includes(id)) {
      setBookmarks([...bookmarks, id]);
    }
  };

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark !== id));
  };

  const isBookmarked = (id) => bookmarks.includes(id);

  const toggleBookmark = (id) => {
    if (isBookmarked(id)) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
};