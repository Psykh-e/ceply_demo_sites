import React from 'react';
import { ArrowRight, Coffee, Award, Sparkles, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenRoastQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenRoastQuiz }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#FAF7F2]">
      {/* Background Decorative Lines & Images */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#2C1E16]/10 text-xs font-medium text-[#2C1E16] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="tracking-wider uppercase text-[10px] font-semibold text-[#2C1E16]">
                Espresso Bar Open • 7:00 AM – 9:00 PM
              </span>
              <span className="text-[#2C1E16]/30">|</span>
              <span className="flex items-center gap-1 text-[#8C5E38] text-[11px] font-medium">
                <MapPin className="w-3 h-3" /> Soho, London
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#2C1E16] tracking-tight leading-[1.08]">
              Where <span className="italic font-light text-[#8C5E38]">Artisanal Precision</span> Meets Architectural Serenity
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base sm:text-lg text-[#2C1E16]/75 font-light leading-relaxed">
              Single-origin specialty coffees, hand-selected from high-altitude micro-farms and slow-roasted daily in small batches for extraordinary clarity and warmth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2C1E16] hover:bg-[#422D22] transition-all duration-200 shadow-sm hover:translate-y-[-1px]"
              >
                Explore Menu
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2C1E16] bg-[#FFFFFF] border border-[#2C1E16]/20 hover:border-[#A67C52] hover:text-[#A67C52] transition-all duration-200 shadow-xs"
              >
                Reserve Table
              </button>

              <button
                onClick={onOpenRoastQuiz}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#8C5E38] bg-[#A67C52]/10 hover:bg-[#A67C52]/20 transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Flavor Matcher
              </button>
            </div>

            {/* Feature Badges */}
            <div className="pt-6 border-t border-[#2C1E16]/10 grid grid-cols-3 gap-4">
              <div>
                <div className="font-serif text-2xl font-semibold text-[#2C1E16]">91.5+</div>
                <div className="text-[11px] uppercase tracking-wider text-[#2C1E16]/60 mt-0.5">SCA Cupping Score</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-[#2C1E16]">100%</div>
                <div className="text-[11px] uppercase tracking-wider text-[#2C1E16]/60 mt-0.5">Direct Micro-Trade</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-[#2C1E16]">Daily</div>
                <div className="text-[11px] uppercase tracking-wider text-[#2C1E16]/60 mt-0.5">Fresh Batch Roasted</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Showcase Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-[#2C1E16]/10 relative group">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
                  alt="Aura Coffee Sanctuary Bar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E16]/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2]">
                  <span className="text-[10px] font-semibold uppercase tracking-widest bg-[#A67C52] px-2.5 py-1 rounded-md mb-2 inline-block">
                    Architectural Sanctuary
                  </span>
                  <p className="font-serif text-xl font-medium leading-snug">
                    Charcoal Italian Marble & Acoustic Oak Interior
                  </p>
                </div>
              </div>

              {/* Floating Overlay Card */}
              <div className="absolute -bottom-6 -left-6 bg-[#FFFFFF] p-4 rounded-2xl border border-[#2C1E16]/10 shadow-md hidden sm:flex items-center gap-3.5 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-[#A67C52]/15 flex items-center justify-center text-[#8C5E38] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#2C1E16]">Signature Geisha Batch</div>
                  <div className="text-[11px] text-[#2C1E16]/60">Panama Boquete High-Altitude Reserve</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
