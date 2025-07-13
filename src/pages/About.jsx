import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Target, Award, Heart, Lightbulb } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Comprehensive Learning",
      description: "Complete educational resources covering all aspects of textile engineering from basic concepts to advanced techniques."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Student-Centered",
      description: "Designed specifically for textile engineering students with content aligned to academic curricula and industry needs."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Practical Focus",
      description: "Real-world applications, process parameters, and industry-standard practices to bridge theory and practice."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Content",
      description: "Carefully curated information from trusted sources, reviewed by industry experts and academic professionals."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Free Access",
      description: "Completely free educational platform committed to making quality textile education accessible to everyone."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Interactive Learning",
      description: "Quizzes, interactive tools, and hands-on examples to enhance understanding and retention."
    }
  ];

  const stats = [
    { number: "500+", label: "Study Materials" },
    { number: "100+", label: "Process Guides" },
    { number: "50+", label: "Quiz Questions" },
    { number: "1000+", label: "Happy Students" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-gray-800 mb-6"
          >
            About TextTrace
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            TextTrace is a comprehensive educational platform designed specifically for textile engineering students. 
            We provide the tools, resources, and knowledge needed to master the complex world of textile processing, 
            dyeing techniques, and material science.
          </motion.p>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-hero text-white dark:text-gray-100 rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-6 text-white dark:text-gray-100">Our Mission</h2>
            <p className="text-xl leading-relaxed mb-6 text-white dark:text-gray-100">
              To democratize textile education by providing free, high-quality, and accessible learning resources 
              that empower students to excel in their textile engineering studies and careers.
            </p>
            <p className="text-lg opacity-90 text-white dark:text-gray-100">
              We believe that quality education should be available to everyone, regardless of their background or financial situation.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-light mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-500 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-gray-800 text-center mb-12">
            Why Choose TextTrace?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light p-3 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What We Cover */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12 mb-16"
        >
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white text-center mb-8">
            What We Cover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Dyeing & Coloration</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Acid, reactive, disperse, and natural dye systems</li>
                <li>• Color theory and color matching</li>
                <li>• Dyeing machinery and processes</li>
                <li>• Color fastness testing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Textile Processing</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Preparation processes (scouring, bleaching)</li>
                <li>• Chemical finishing techniques</li>
                <li>• Mechanical finishing methods</li>
                <li>• Quality control and testing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Material Science</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Fiber properties and characteristics</li>
                <li>• Material comparison and selection</li>
                <li>• Structure-property relationships</li>
                <li>• Performance testing methods</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Industry Knowledge</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Current industry standards</li>
                <li>• Environmental considerations</li>
                <li>• Safety protocols and practices</li>
                <li>• Career guidance and opportunities</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-gray-800 mb-4">
            Join Our Learning Community
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-800 mb-8 max-w-3xl mx-auto">
            Whether you're a first-year student or preparing for your final exams, TextTrace provides 
            the comprehensive resources you need to succeed in textile engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quiz"
              className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
            >
              Start Learning Today
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;