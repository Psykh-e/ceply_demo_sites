import React, { useState } from 'react';
import { MENU_ITEMS, CATEGORIES } from '../data/coffeeData';
import { MenuItem, CategoryId } from '../types';
import { Search, Sparkles, Coffee, Plus, Heart } from 'lucide-react';

interface FeaturedMenuProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const FeaturedMenu: React.FC<FeaturedMenuProps> = ({ onSelectItem, onQuickAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'vegan' | 'strong'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.categoryId === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesFilter = true;
    if (activeFilter === 'popular') matchesFilter = !!item.isPopular;
    if (activeFilter === 'vegan')
      matchesFilter = item.dietary?.some((d) => d.toLowerCase().includes('vegan')) || false;
    if (activeFilter === 'strong') matchesFilter = (item.strength ?? 0) >= 4;

    return matchesCategory && matchesSearch && matchesFilter;
  });

  return (
    <section id="menu" className="py-24 bg-[#FAF7F2] relative border-t border-[#2C1E16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/20 text-[#8C5E38] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Seasonal Offerings
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#2C1E16] mb-4">
            Crafted with Precision & Passion
          </h2>
          <p className="text-[#2C1E16]/70 text-sm sm:text-base leading-relaxed">
            Every beverage is formulated using precise extraction profiles, certified organic milks, and micro-batch beans roasted daily in our Soho laboratory.
          </p>
        </div>

        {/* Search Bar & Quick Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C5E38] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drinks, notes, beans..."
              className="w-full bg-[#FFFFFF] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#2C1E16] placeholder-[#2C1E16]/40 focus:outline-none transition-colors shadow-xs"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
            <span className="text-xs text-[#2C1E16]/50 font-medium mr-1 hidden sm:inline">Filter:</span>
            {[
              { id: 'all', label: 'All Items' },
              { id: 'popular', label: '★ Favorites' },
              { id: 'vegan', label: 'Plant-Based' },
              { id: 'strong', label: 'Bold Roast (4+ Strength)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeFilter === f.id
                    ? 'bg-[#2C1E16] text-[#FAF7F2] font-semibold shadow-xs'
                    : 'bg-[#FFFFFF] text-[#2C1E16]/70 border border-[#2C1E16]/15 hover:border-[#A67C52]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-[#2C1E16]/10 pb-4 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryId)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#2C1E16] text-[#FAF7F2] shadow-xs'
                  : 'text-[#2C1E16]/60 hover:text-[#2C1E16] bg-[#FFFFFF] border border-[#2C1E16]/10'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#2C1E16]/10 max-w-md mx-auto p-8 shadow-xs">
            <Coffee className="w-12 h-12 text-[#A67C52]/40 mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-[#2C1E16]">No beverages found</h3>
            <p className="text-xs text-[#2C1E16]/60 mt-1">Try adjusting your search criteria or resetting filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setActiveFilter('all');
              }}
              className="mt-5 px-5 py-2.5 bg-[#2C1E16] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#422D22] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="editorial-card rounded-2xl p-5 flex flex-col justify-between group cursor-pointer relative"
                >
                  {/* Item Image with Overlay Badges */}
                  <div className="relative h-52 rounded-xl overflow-hidden mb-4 bg-[#F2EBDC]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E16]/50 via-transparent to-transparent opacity-60" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {item.badges && item.badges.length > 0 ? (
                        <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#FAF7F2] text-[#2C1E16] px-2.5 py-1 rounded-md border border-[#2C1E16]/10 shadow-xs">
                          {item.badges[0]}
                        </span>
                      ) : (
                        <span />
                      )}

                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
                          isFav
                            ? 'bg-rose-500 text-white'
                            : 'bg-[#FAF7F2]/80 text-[#2C1E16] hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Bottom Origin / Price Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      {item.origin && (
                        <span className="text-[10px] font-medium text-[#FAF7F2] bg-[#2C1E16]/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                          📍 {item.origin}
                        </span>
                      )}
                      <span className="font-serif font-bold text-lg text-[#2C1E16] bg-[#FAF7F2] px-3 py-0.5 rounded-md border border-[#2C1E16]/10 shadow-xs ml-auto">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Info Header */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-serif text-2xl font-semibold text-[#2C1E16] group-hover:text-[#8C5E38] transition-colors">
                        {item.name}
                      </h3>
                      {/* Coffee Roast Strength Indicators */}
                      {Boolean(item.strength && item.strength > 0) && (
                        <div className="flex items-center gap-1" title={`Roast Strength: ${item.strength}/5`}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span
                              key={s}
                              className={`w-1.5 h-2.5 rounded-xs ${
                                s <= (item.strength || 0) ? 'bg-[#A67C52]' : 'bg-[#E5DACE]'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-[#2C1E16]/70 line-clamp-2 mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tasting Notes */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.notes.map((note) => (
                        <span
                          key={note}
                          className="text-[10px] font-medium bg-[#F5EFE6] text-[#8C5E38] px-2.5 py-0.5 rounded-md border border-[#2C1E16]/10"
                        >
                          • {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#2C1E16]/10 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-medium text-[#2C1E16]/50">Customizable</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2C1E16] hover:bg-[#422D22] px-4 py-2 rounded-lg transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Customize
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
