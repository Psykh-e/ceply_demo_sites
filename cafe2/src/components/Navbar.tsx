import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Calendar, Sparkles, Menu as MenuIcon, X, MapPin } from 'lucide-react';

interface NavbarProps {
  orderCount: number;
  onOpenBag: () => void;
  onOpenReservation: () => void;
  onOpenRoastQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  orderCount,
  onOpenBag,
  onOpenReservation,
  onOpenRoastQuiz,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Flavor Match', href: '#roast-quiz' },
    { name: 'Our Craft', href: '#story' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Visit Us', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#2C1E16]/10 py-3 shadow-xs'
          : 'bg-[#FAF7F2]/80 backdrop-blur-xs py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#2C1E16] text-[#FAF7F2] flex items-center justify-center group-hover:bg-[#A67C52] transition-colors duration-300">
            <Coffee className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#2C1E16] leading-none">
              AURA
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#8C5E38] uppercase mt-0.5 font-semibold">
              Artisanal Roastery
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-[#2C1E16]/80 hover:text-[#A67C52] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#A67C52] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenRoastQuiz}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C5E38] px-3.5 py-2 rounded-full border border-[#A67C52]/30 hover:bg-[#A67C52]/10 transition-all duration-200"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Flavor Match
          </button>

          <button
            onClick={onOpenReservation}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2C1E16] hover:bg-[#422D22] px-4 py-2 rounded-full transition-all duration-200"
          >
            <Calendar className="w-3.5 h-3.5" />
            Reserve Table
          </button>

          <button
            onClick={onOpenBag}
            className="relative p-2.5 rounded-full bg-[#FFFFFF] border border-[#2C1E16]/15 text-[#2C1E16] hover:border-[#A67C52] hover:text-[#A67C52] transition-all duration-200 shadow-xs"
            aria-label="View Order Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {orderCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#A67C52] text-[#FAF7F2] font-bold text-[10px] flex items-center justify-center">
                {orderCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="flex sm:hidden items-center gap-2.5">
          <button
            onClick={onOpenBag}
            className="relative p-2 rounded-full bg-[#FFFFFF] border border-[#2C1E16]/15 text-[#2C1E16]"
          >
            <ShoppingBag className="w-4 h-4" />
            {orderCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A67C52] text-[#FAF7F2] font-bold text-[9px] flex items-center justify-center">
                {orderCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2C1E16] hover:text-[#A67C52] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#2C1E16]/10 px-6 py-6 transition-all shadow-md">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif text-[#2C1E16] hover:text-[#A67C52] transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[#2C1E16]/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRoastQuiz();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-[#A67C52]/40 text-[#8C5E38] text-xs font-semibold uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Find Your Flavor Match
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#2C1E16] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                Reserve a Table
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
