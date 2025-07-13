import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ShareButton = ({ title, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        // Fallback to clipboard
        fallbackCopy(url);
      }
    } else {
      fallbackCopy(url);
    }
  };

  const fallbackCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <motion.button
      onClick={handleShare}
      className={`p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Share"
    >
      {copied ? <Check size={20} className="text-green-500" /> : <Share2 size={20} />}
    </motion.button>
  );
};

export default ShareButton;