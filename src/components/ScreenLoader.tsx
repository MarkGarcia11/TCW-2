import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

export const ScreenLoader: React.FC<{ finishLoading: () => void }> = ({ finishLoading }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(finishLoading, 1000); // Wait for exit animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-midnight-chest"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <Logo variant="full" className="scale-125 md:scale-150" />
              
              {/* Elegant golden ring that expands */}
              <motion.div 
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ width: 300, height: 300, opacity: [0, 0.5, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-antique-gold rounded-full"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
              className="mt-8 font-serif italic text-ivory-muted text-lg tracking-wide"
            >
              Curating time...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
