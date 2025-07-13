import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const Recipes = React.lazy(() => import('./pages/Recipes'));
const Processes = React.lazy(() => import('./pages/Processes'));
const Materials = React.lazy(() => import('./pages/Materials'));
const Glossary = React.lazy(() => import('./pages/Glossary'));
const Quiz = React.lazy(() => import('./pages/Quiz'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:bg-gray-900 font-body transition-colors duration-300">
        <Navbar />
        <main className="min-h-screen">
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/processes" element={<Processes />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;