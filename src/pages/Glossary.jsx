import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../hooks/useSearch';
import glossaryData from '../data/glossary.json';

const Glossary = () => {
  const { query, setQuery, results } = useSearch(glossaryData, {
    keys: ['term', 'definition', 'category']
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLetter, setSelectedLetter] = useState('all');

  const categories = ['all', ...new Set(glossaryData.map(item => item.category))];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const filteredResults = results
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .filter(item => selectedLetter === 'all' || item.term.charAt(0).toUpperCase() === selectedLetter)
    .sort((a, b) => a.term.localeCompare(b.term));

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Properties': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'Dyes': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'Chemistry': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'Processing': return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
      case 'Finishing': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'Testing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'Measurement': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100';
      case 'Materials': return 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100';
      case 'Dyeing': return 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100';
      case 'Chemicals': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-gray-800 mb-4">
            Textile Glossary
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-700 max-w-3xl mx-auto">
            Comprehensive dictionary of textile engineering terms and definitions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <SearchBar 
                  query={query} 
                  setQuery={setQuery} 
                  placeholder="Search terms..."
                />
              </div>

              {/* Alphabet Filter */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-600 mb-3">Filter by Letter</h3>
                <div className="grid grid-cols-6 lg:grid-cols-4 gap-1">
                  <button
                    onClick={() => setSelectedLetter('all')}
                    className={`px-2 py-1 text-sm rounded transition-colors ${
                      selectedLetter === 'all'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  {alphabet.map(letter => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`px-2 py-1 text-sm rounded transition-colors ${
                        selectedLetter === letter
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
              Filter by Category
            </h3>

            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      selectedCategory === category
                        ? /* ACTIVE */
                          'bg-primary text-white dark:bg-primary-light dark:text-gray-900'
                        : /* INACTIVE */
                          'bg-gray-100 text-gray-700 hover:bg-gray-200 \
                          dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-600">
                Showing {filteredResults.length} of {glossaryData.length} terms
              </p>
            </div>

            {/* Terms List */}
            <div className="space-y-4">
              {filteredResults.map((item, index) => (
                <motion.div
                  key={item.term}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.02 * index }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                      {item.term}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)} flex-shrink-0`}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.definition}
                  </p>
                </motion.div>
              ))}
            </div>

            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No terms found matching your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Glossary;