import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-heading font-bold mb-4">TextTrace</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4 leading-relaxed">
              A comprehensive educational platform for textile engineering students. 
              Learn dyeing processes, material properties, and industry best practices.
            </p>
            <div className="flex items-center text-sm text-gray-300 dark:text-gray-400">
              Made with <Heart size={16} className="mx-1 text-red-400" /> for textile education
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/recipes" className="text-gray-300 hover:text-white transition-colors">Dyeing Recipes</Link></li>
              <li><Link to="/processes" className="text-gray-300 hover:text-white transition-colors">Processes</Link></li>
              <li><Link to="/materials" className="text-gray-300 hover:text-white transition-colors">Materials</Link></li>
              <li><Link to="/glossary" className="text-gray-300 hover:text-white transition-colors">Glossary</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/quiz" className="text-gray-300 hover:text-white transition-colors">Quiz</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 dark:text-gray-400">
            © 2025 TextTrace Educational Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;