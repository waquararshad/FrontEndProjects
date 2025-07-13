import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBookmarks } from '../hooks/useBookmarks';

const BookmarkButton = ({ id, className = '' }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(id);

  return (
    <motion.button
      onClick={() => toggleBookmark(id)}
      className={`p-2 rounded-lg transition-colors ${
        bookmarked 
          ? 'text-accent bg-accent/10 hover:bg-accent/20' 
          : 'text-gray-400 hover:text-accent hover:bg-accent/10'
      } ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
    </motion.button>
  );
};

export default BookmarkButton;