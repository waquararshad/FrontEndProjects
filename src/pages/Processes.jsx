import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Thermometer, Clock, Beaker } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../hooks/useSearch';
import processesData from '../data/processes.json';

const Processes = () => {
  const { query, setQuery, results } = useSearch(processesData, {
    keys: ['name', 'purpose', 'category', 'chemicals']
  });
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(processesData.map(process => process.category))];
  
  const filteredResults = selectedCategory === 'all' 
    ? results 
    : results.filter(process => process.category === selectedCategory);

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Preparation': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'Chemical Finishing': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'Mechanical Finishing': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'Dimensional Stabilization': return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
      case 'Thermal Treatment': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Textile Processes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive guide to textile preparation and finishing processes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-center">
            <SearchBar 
              query={query} 
              setQuery={setQuery} 
              placeholder="Search processes, purposes, or chemicals..."
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredResults.length} of {processesData.length} processes
          </p>
        </div>

        {/* Processes Accordion */}
        <div className="space-y-4">
          {filteredResults.map((process, index) => (
            <motion.div
              key={process.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => toggleExpanded(process.id)}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                        {process.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(process.category)}`}>
                        {process.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {process.purpose}
                    </p>
                  </div>
                  <div className="ml-4">
                    {expandedItems.has(process.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedItems.has(process.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6 space-y-6">
                      {/* Process Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <Thermometer size={16} className="text-blue-600 dark:text-blue-400 mr-2" />
                            <span className="font-medium text-blue-800 dark:text-blue-200">Temperature</span>
                          </div>
                          <p className="text-blue-700 dark:text-blue-300">{process.temperature}</p>
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <Clock size={16} className="text-green-600 dark:text-green-400 mr-2" />
                            <span className="font-medium text-green-800 dark:text-green-200">Duration</span>
                          </div>
                          <p className="text-green-700 dark:text-green-300">{process.time}</p>
                        </div>
                        
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <Beaker size={16} className="text-purple-600 dark:text-purple-400 mr-2" />
                            <span className="font-medium text-purple-800 dark:text-purple-200">Process Type</span>
                          </div>
                          <p className="text-purple-700 dark:text-purple-300">{process.process}</p>
                        </div>
                      </div>

                      {/* Method Description */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Method</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {process.method}
                        </p>
                      </div>

                      {/* Chemicals Used */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Chemicals Used</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {process.chemicals.map((chemical, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
                            >
                              <span className="text-gray-700 dark:text-gray-300 text-sm">
                                {chemical}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No processes found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Processes;