import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'monochrome';
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  variant = 'full' 
}) => {
  const isMonochrome = variant === 'monochrome';
  const gold = isMonochrome ? '#C9A24B' : '#C9A24B';
  const goldLight = isMonochrome ? '#E6C879' : '#E6C879';
  const wood = isMonochrome ? '#8A6A2F' : '#5A3A22';

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg 
        width={variant === 'icon' ? 40 : 40} 
        height={variant === 'icon' ? 40 : 40} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Chest Body */}
        <path 
          d="M20 50 L80 50 L75 80 L25 80 Z" 
          fill={wood} 
          stroke={gold} 
          strokeWidth="2" 
        />
        {/* Chest Lid (Half Open) */}
        <path 
          d="M20 50 L15 30 L85 30 L80 50 Z" 
          fill={wood} 
          stroke={gold} 
          strokeWidth="2" 
          transform="rotate(-10, 50, 50)"
        />
        {/* Gold Trim */}
        <rect x="25" y="60" width="10" height="10" fill={gold} />
        <rect x="65" y="60" width="10" height="10" fill={gold} />
        
        {/* Overflowing Watches (Simplified Elegant Shapes) */}
        <circle cx="40" cy="40" r="6" fill={goldLight} stroke={gold} strokeWidth="1" />
        <circle cx="50" cy="35" r="7" fill="#1F7A5C" stroke={gold} strokeWidth="1" /> {/* Emerald */}
        <circle cx="60" cy="42" r="6" fill="#2B5FA8" stroke={gold} strokeWidth="1" /> {/* Sapphire */}
        <rect x="45" y="38" width="4" height="10" rx="2" fill={gold} transform="rotate(15, 47, 43)" />
      </svg>
      
      {variant !== 'icon' && (
        <span className="font-logo text-antique-gold text-2xl md:text-3xl tracking-wide leading-none">
          Treasure Chest <span className="block text-sm font-sans uppercase tracking-[0.2em] text-ivory-muted mt-1">Watches</span>
        </span>
      )}
    </div>
  );
};
