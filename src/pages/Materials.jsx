import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ToggleLeft, ToggleRight, ArrowUpDown } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../hooks/useSearch';
import materialsData from '../data/materials.json';

const Materials = () => {
  const { query, setQuery, results } = useSearch(materialsData, {
    keys: ['name', 'type', 'properties']
  });
  const [isMetric, setIsMetric] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const properties = [
    { key: 'strength', label: 'Strength', unit: isMetric ? 'g/den' : 'g/den' },
    { key: 'dyeAffinity', label: 'Dye Affinity', unit: '/10' },
    { key: 'comfort', label: 'Comfort', unit: '/10' },
    { key: 'cost', label: 'Cost', unit: '/10' },
    { key: 'durability', label: 'Durability', unit: '/10' },
    { key: 'elasticity', label: 'Elasticity', unit: '/10' },
    { key: 'moisture', label: 'Moisture Absorption', unit: '/10' }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedResults = [...results].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const exportCSV = () => {
    const headers = ['Name', 'Type', ...properties.map(p => p.label), 'Properties', 'Uses'];
    const csvData = [
      headers.join(','),
      ...sortedResults.map(material => [
        material.name,
        material.type,
        ...properties.map(p => material[p.key]),
        `"${material.properties}"`,
        `"${material.uses}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'textile-materials.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getPropertyColor = (value) => {
    if (value >= 8) return 'bg-green-500';
    if (value >= 6) return 'bg-yellow-500';
    if (value >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Natural Cellulose': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'Natural Protein': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'Synthetic': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'Regenerated Cellulose': return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
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
            Material Comparison
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-700 max-w-3xl mx-auto">
            Compare properties and characteristics of different textile materials
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <SearchBar 
              query={query} 
              setQuery={setQuery} 
              placeholder="Search materials or properties..."
            />
            
            <div className="flex items-center gap-4">
              {/* Unit Toggle */}
              <div className="flex items-center gap-2">
                <span className={`text-sm ${isMetric ? 'text-primary font-medium' : 'text-gray-500'}`}>
                  Metric
                </span>
                <button
                  onClick={() => setIsMetric(!isMetric)}
                  className="p-1 text-primary hover:text-primary/80 transition-colors"
                >
                  {isMetric ? <ToggleLeft size={24} /> : <ToggleRight size={24} />}
                </button>
                <span className={`text-sm ${!isMetric ? 'text-primary font-medium' : 'text-gray-500'}`}>
                  Imperial
                </span>
              </div>

              {/* Export CSV */}
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-600">
            Showing {sortedResults.length} of {materialsData.length} materials
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                    Material
                  </th>
                  {properties.map(property => (
                    <th
                      key={property.key}
                      className="px-3 py-4 text-center text-sm font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => handleSort(property.key)}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {property.label}
                        <ArrowUpDown size={14} className="text-gray-400" />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {property.unit}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedResults.map((material, index) => (
                  <motion.tr
                    key={material.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {material.name}
                        </div>
                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
                          {material.type}
                        </span>
                      </div>
                    </td>
                    {properties.map(property => (
                      <td key={property.key} className="px-3 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="relative w-12 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getPropertyColor(material[property.key])} transition-all duration-300`}
                              style={{ width: `${(material[property.key] / 10) * 100}%` }}
                            />
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {material[property.key]}
                          </span>
                        </div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {sortedResults.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                  {material.name}
                </h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(material.type)}`}>
                  {material.type}
                </span>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {properties.map(property => (
                  <div key={property.key} className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {property.label}
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="relative w-8 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mr-2">
                        <div
                          className={`h-full ${getPropertyColor(material[property.key])} transition-all duration-300`}
                          style={{ width: `${(material[property.key] / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {material[property.key]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Properties: </span>
                  <span className="text-gray-600 dark:text-gray-300">{material.properties}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Uses: </span>
                  <span className="text-gray-600 dark:text-gray-300">{material.uses}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {sortedResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No materials found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Materials;