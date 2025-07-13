import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Beaker, Package, Search, Brain, Users } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Beaker className="h-8 w-8" />,
      title: "Dyeing Recipes",
      description: "Comprehensive collection of dyeing methods for different fiber types",
      link: "/recipes",
      color: "bg-blue-500"
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Textile Processes",
      description: "Detailed guides on textile preparation and finishing processes",
      link: "/processes",
      color: "bg-green-500"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Material Comparison",
      description: "Compare properties and characteristics of different textile materials",
      link: "/materials",
      color: "bg-purple-500"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Glossary",
      description: "Extensive dictionary of textile engineering terms and definitions",
      link: "/glossary",
      color: "bg-indigo-500"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Quiz",
      description: "Test your knowledge with interactive multiple-choice questions",
      link: "/quiz",
      color: "bg-red-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "About Us",
      description: "Learn more about our educational platform and mission",
      link: "/about",
      color: "bg-orange-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Master Textile Engineering
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your comprehensive platform for learning dyeing processes, material properties, 
            and textile engineering fundamentals
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/recipes"
              className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Recipes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-200 backdrop-blur-sm border border-white/20"
            >
              Take Quiz
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Learn
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive resources designed specifically for textile engineering students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link to={feature.link} className="block">
                  <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-gray-100 dark:border-gray-600">
                    <div className={`${feature.color} text-white p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary dark:text-primary-light group-hover:translate-x-2 transition-transform duration-200">
                      <span className="font-medium">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary dark:bg-gray-900 text-white dark:text-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Master Textile Engineering?
          </h2>
          <p className="text-xl text-gray-100 dark:text-gray-200 mb-8 leading-relaxed">
            Join thousands of students who are advancing their textile knowledge with our comprehensive platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quiz"
              className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white dark:text-gray-100 font-semibold rounded-lg transition-colors duration-200 backdrop-blur-sm border border-white/20"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;