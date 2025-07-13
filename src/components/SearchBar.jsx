import React from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ query, setQuery, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />
        {query && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;