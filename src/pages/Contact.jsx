import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: "support@texttrace.edu",
      description: "Send us your questions and we'll respond within 24 hours"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      details: "Available 9AM - 6PM EST",
      description: "Get instant help from our support team"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      details: "+1 (555) 123-4567",
      description: "Call us for urgent technical issues"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: "123 Education Ave, Learning City",
      description: "Our campus is open to students and educators"
    }
  ];

  const faqs = [
    {
      question: "Is TextTrace completely free to use?",
      answer: "Yes! TextTrace is completely free for all students and educators. We believe quality education should be accessible to everyone."
    },
    {
      question: "How often is the content updated?",
      answer: "We regularly update our content to reflect the latest industry standards and academic requirements. Major updates occur quarterly."
    },
    {
      question: "Can I suggest new topics or corrections?",
      answer: "Absolutely! We welcome feedback and suggestions from our community. Use the contact form or email us directly."
    },
    {
      question: "Are there any prerequisites for using the platform?",
      answer: "No prerequisites required! Our content is designed for textile engineering students at all levels, from beginners to advanced."
    },
    {
      question: "Can instructors use TextTrace in their courses?",
      answer: "Yes! Instructors are welcome to use our resources in their teaching. Contact us for educator resources and support."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Have questions, suggestions, or need support? We're here to help you succeed in your textile engineering journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="content">Content Suggestion</option>
                      <option value="bug">Bug Report</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
            >
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light p-3 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{info.title}</h3>
                      <p className="text-primary dark:text-primary-light font-medium">{info.details}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
            >
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Support */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-hero text-white rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-heading font-bold mb-4">
            Need Immediate Help?
          </h2>
          <p className="text-xl mb-6">
            Check out our comprehensive documentation and tutorial videos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/glossary"
              className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors backdrop-blur-sm border border-white/20"
            >
              Browse Glossary
            </a>
            <a
              href="/quiz"
              className="inline-flex items-center px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors"
            >
              Test Your Knowledge
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;