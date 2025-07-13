import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/recipes', label: 'Recipes' },
    { path: '/processes', label: 'Processes' },
    { path: '/materials', label: 'Materials' },
    { path: '/glossary', label: 'Glossary' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.h1 
              className="text-2xl font-heading font-bold text-primary dark:text-primary-light"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              TextTrace
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(path)
                    ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(path)
                    ? 'text-primary dark:text-primary-light bg-primary/10 dark:bg-primary-light/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;