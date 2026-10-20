import React from 'react';
import { Logo } from '../Logo';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-midnight-chest border-t border-antique-gold/20 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="text-ivory-muted text-sm leading-relaxed max-w-xs">
            A hand-picked collection of watches worth discovering. We treat every piece as an heirloom, ensuring its story continues for generations.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-ivory-muted hover:text-antique-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-ivory-muted hover:text-antique-gold transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-ivory-muted hover:text-antique-gold transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-ivory-muted hover:text-antique-gold transition-colors"><Mail size={20} /></a>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h4 className="text-antique-gold font-serif text-xl mb-6">Shop</h4>
          <ul className="flex flex-col gap-4 text-ivory-muted text-sm">
            <li><Link to="/shop" className="hover:text-ivory transition-colors">All Watches</Link></li>
            <li><Link to="/shop/vintage" className="hover:text-ivory transition-colors">Vintage</Link></li>
            <li><Link to="/shop/modern" className="hover:text-ivory transition-colors">Modern Luxury</Link></li>
            <li><Link to="/shop/independent" className="hover:text-ivory transition-colors">Independent Makers</Link></li>
            <li><Link to="/shop/heirloom" className="hover:text-ivory transition-colors">Heirloom Pieces</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="text-antique-gold font-serif text-xl mb-6">Company</h4>
          <ul className="flex flex-col gap-4 text-ivory-muted text-sm">
            <li><Link to="/our-story" className="hover:text-ivory transition-colors">Our Story</Link></li>
            <li><Link to="/stories" className="hover:text-ivory transition-colors">Journal</Link></li>
            <li><Link to="/brands" className="hover:text-ivory transition-colors">Brands</Link></li>
            <li><Link to="/authenticity" className="hover:text-ivory transition-colors">Authenticity</Link></li>
            <li><Link to="/contact" className="hover:text-ivory transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Help Column */}
        <div>
          <h4 className="text-antique-gold font-serif text-xl mb-6">Support</h4>
          <ul className="flex flex-col gap-4 text-ivory-muted text-sm">
            <li><Link to="/shipping" className="hover:text-ivory transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/warranty" className="hover:text-ivory transition-colors">Warranty</Link></li>
            <li><Link to="/faq" className="hover:text-ivory transition-colors">FAQ</Link></li>
            <li><Link to="/privacy" className="hover:text-ivory transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-ivory transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-antique-gold/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <p className="text-ivory-muted text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Treasure Chest Watches. All rights reserved.
        </p>
        <p className="font-serif italic text-antique-gold text-sm">
          "Every watch has a story."
        </p>
      </div>
    </footer>
  );
};
