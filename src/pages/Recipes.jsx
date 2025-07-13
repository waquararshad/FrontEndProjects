import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Thermometer, Users, Tag } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import BookmarkButton from '../components/BookmarkButton';
import ShareButton from '../components/ShareButton';
import { useSearch } from '../hooks/useSearch';
import dyeingData from '../data/dyeing.json';

const Recipes = () => {
  const { query, setQuery, results } = useSearch(dyeingData, {
    keys: ['title', 'type', 'suitableFabrics', 'tags']
  });
  const [selectedType, setSelectedType] = useState('all');

  const types = ['all', ...new Set(dyeingData.map(recipe => recipe.type))];
  
  const filteredResults = selectedType === 'all' 
    ? results 
    : results.filter(recipe => recipe.type === selectedType);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
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
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Dyeing Recipes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive collection of dyeing methods for different fiber types and applications
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-center">
            <SearchBar 
              query={query} 
              setQuery={setQuery} 
              placeholder="Search recipes, dye types, or fabrics..."
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredResults.length} of {dyeingData.length} recipes
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredResults.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                      {recipe.title}
                    </h3>
                    <span className="inline-block bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light px-3 py-1 rounded-full text-sm font-medium">
                      {recipe.type}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <BookmarkButton id={recipe.id} />
                    <ShareButton title={recipe.title} />
                  </div>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Thermometer size={16} className="mr-2" />
                    {recipe.temperature}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock size={16} className="mr-2" />
                    {recipe.time}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="mt-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                </div>
              </div>

              {/* Suitable Fabrics */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Suitable Fabrics</h4>
                <div className="flex flex-wrap gap-2">
                  {recipe.suitableFabrics.map(fabric => (
                    <span
                      key={fabric}
                      className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-1 rounded text-sm"
                    >
                      {fabric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Materials Required</h4>
                <ul className="space-y-1">
                  {recipe.materials.map((material, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-300 text-sm flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {material}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process Steps */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Process Steps</h4>
                <ol className="space-y-2">
                  {recipe.steps.map((step, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-300 text-sm flex">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tags and Notes */}
              <div className="p-6">
                {recipe.tags && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Tag size={16} className="mr-2 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {recipe.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {recipe.notes && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      <strong>Note:</strong> {recipe.notes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No recipes found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Recipes;