'use client';

import { Home, Menu as MenuIcon, MapPin, ExternalLink } from 'lucide-react';

export default function BottomNav() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-lg bg-[#2B1810]/85 border-t border-[#C69C6D]/20 shadow-[0_-5px_20px_rgba(0,0,0,0.3)] pb-safe-bottom">
      <div className="flex justify-around items-center h-16 px-2 text-[#FFF8F0]/80">
        
        {/* Home */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center flex-1 h-full font-poppins text-[10px] tracking-wider uppercase font-medium hover:text-[#C69C6D] transition-colors duration-300 focus:outline-none cursor-pointer"
        >
          <Home className="w-4 h-4 mb-1 text-[#C69C6D]" />
          <span>Home</span>
        </button>

        {/* Menu */}
        <button
          onClick={() => scrollToSection('menu-section')}
          className="flex flex-col items-center justify-center flex-1 h-full font-poppins text-[10px] tracking-wider uppercase font-medium hover:text-[#C69C6D] transition-colors duration-300 focus:outline-none cursor-pointer"
        >
          <MenuIcon className="w-4 h-4 mb-1 text-[#C69C6D]" />
          <span>Menu</span>
        </button>

        {/* Location */}
        <button
          onClick={() => scrollToSection('location-section')}
          className="flex flex-col items-center justify-center flex-1 h-full font-poppins text-[10px] tracking-wider uppercase font-medium hover:text-[#C69C6D] transition-colors duration-300 focus:outline-none cursor-pointer"
        >
          <MapPin className="w-4 h-4 mb-1 text-[#C69C6D]" />
          <span>Location</span>
        </button>

        {/* Swiggy */}
        <a
          href="https://www.swiggy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 h-full font-poppins text-[10px] tracking-wider uppercase font-medium hover:text-[#C69C6D] transition-colors duration-300 focus:outline-none text-center"
        >
          <div className="relative flex items-center justify-center mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC8019] absolute -top-0.5 -right-0.5" />
            <ExternalLink className="w-4 h-4 text-[#C69C6D]" />
          </div>
          <span>Swiggy</span>
        </a>

        {/* Zomato */}
        <a
          href="https://www.zomato.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 h-full font-poppins text-[10px] tracking-wider uppercase font-medium hover:text-[#C69C6D] transition-colors duration-300 focus:outline-none text-center"
        >
          <div className="relative flex items-center justify-center mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CB202D] absolute -top-0.5 -right-0.5" />
            <ExternalLink className="w-4 h-4 text-[#C69C6D]" />
          </div>
          <span>Zomato</span>
        </a>

      </div>
    </nav>
  );
}
