import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react';
import { Logo } from '../Logo';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Watch of the Month', href: '/watch-of-the-month' },
    { name: 'Stories', href: '/stories' },
    { name: 'Brands', href: '/brands' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-midnight-chest/80 backdrop-blur-md py-3 border-b border-antique-gold/20" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-ivory-muted hover:text-antique-gold text-sm uppercase tracking-widest transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button className="text-ivory-muted hover:text-antique-gold transition-colors">
            <Search size={20} />
          </button>
          <button className="text-ivory-muted hover:text-antique-gold transition-colors relative">
            <Heart size={20} />
          </button>
          <Link to="/cart" className="text-ivory-muted hover:text-antique-gold transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-antique-gold text-midnight-chest text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
          <button 
            className="lg:hidden text-ivory-muted hover:text-antique-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-midnight-chest z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end mb-12">
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-ivory-muted hover:text-antique-gold transition-colors"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={link.href} 
                    className="text-ivory text-3xl font-serif italic"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-auto pt-12 border-t border-antique-gold/20">
              <Logo variant="full" className="opacity-50" />
              <p className="text-ivory-muted text-sm mt-4 italic font-serif">Every watch has a story.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
