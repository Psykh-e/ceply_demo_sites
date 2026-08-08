import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/coffeeData';
import { GalleryItem } from '../types';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const activeIndex = activeItem
    ? filteredItems.findIndex((item) => item.id === activeItem.id)
    : -1;

  const handleNext = () => {
    if (activeIndex !== -1 && activeIndex < filteredItems.length - 1) {
      setActiveItem(filteredItems[activeIndex + 1]);
    } else if (filteredItems.length > 0) {
      setActiveItem(filteredItems[0]);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveItem(filteredItems[activeIndex - 1]);
    } else if (filteredItems.length > 0) {
      setActiveItem(filteredItems[filteredItems.length - 1]);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'Escape') setActiveItem(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, activeIndex, filteredItems]);

  return (
    <section id="gallery" className="py-24 bg-[#FAF7F2] relative border-t border-[#2C1E16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/20 text-[#8C5E38] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Visual Journal
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#2C1E16] mb-4">
            The Atmosphere of Aura
          </h2>
          <p className="text-[#2C1E16]/70 text-sm sm:text-base">
            Inside our Soho roastery sanctuary, craft espresso workstation, and daily artisanal pastry bake.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-10">
          {[
            { id: 'all', label: 'All Moments' },
            { id: 'ambiance', label: 'Ambiance & Lounge' },
            { id: 'barista', label: 'Craft Baristas' },
            { id: 'roastery', label: 'Roastery Lab' },
            { id: 'drinks', label: 'Signature Drinks' },
            { id: 'pastries', label: 'Pastry Kitchen' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#2C1E16] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#FFFFFF] text-[#2C1E16]/70 border border-[#2C1E16]/15 hover:border-[#A67C52]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative h-80 rounded-2xl overflow-hidden editorial-card cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E16]/90 via-[#2C1E16]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover icon */}
              <div className="absolute top-4 right-4 p-2.5 rounded-full bg-[#FAF7F2]/90 text-[#2C1E16] border border-[#2C1E16]/10 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-100 scale-75 shadow-xs">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2]">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#A67C52] block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl font-medium mb-1">{item.title}</h3>
                <p className="text-xs text-[#FAF7F2]/80 line-clamp-2 leading-relaxed">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-[#2C1E16]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-[#FAF7F2] text-[#2C1E16] hover:bg-[#A67C52] hover:text-[#FAF7F2] transition-colors z-20 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#FAF7F2] text-[#2C1E16] hover:bg-[#A67C52] hover:text-[#FAF7F2] transition-colors z-20 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#FAF7F2] text-[#2C1E16] hover:bg-[#A67C52] hover:text-[#FAF7F2] transition-colors z-20 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Content Container */}
            <div className="max-w-4xl w-full flex flex-col items-center text-[#FAF7F2]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-2xl border border-white/20 shadow-2xl mb-6"
              />
              <div className="text-center max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#A67C52]">
                  {activeItem.category}
                </span>
                <h3 className="font-serif text-2xl font-normal mt-1 mb-2">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">{activeItem.caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
