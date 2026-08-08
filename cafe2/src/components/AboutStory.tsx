import React from 'react';
import { Award, Sparkles, Check } from 'lucide-react';

export const AboutStory: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-[#2C1E16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/20 text-[#8C5E38] text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Our Roastery Philosophy
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#2C1E16] mb-6 leading-tight">
              Sourced from High-Altitude Micro-Lots, <span className="italic text-[#8C5E38]">Crafted with Quiet Precision</span>
            </h2>
            <p className="text-[#2C1E16]/75 text-sm sm:text-base leading-relaxed mb-6">
              Founded in 2018 by master roasters and interior architects, Aura Coffee was conceived as an urban sanctuary for those who value both sensory perfection and architectural calm. We source exclusively from single-origin micro-lots cultivated above 1,800 meters.
            </p>

            {/* Bullet Highlights */}
            <div className="space-y-3 mb-8">
              {[
                '100% Direct Trade partnerships ensuring 3x fair market prices to micro-farm families',
                'Micro-batch roasting in our restored 1968 cast-iron San Franciscan drum roaster',
                'Water filtered through a 7-stage mineral balance system tailored to coffee solubility',
              ].map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#2C1E16]/80">
                  <div className="w-5 h-5 rounded-full bg-[#A67C52]/20 border border-[#A67C52]/40 flex items-center justify-center text-[#8C5E38] shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-[#2C1E16]/10">
              <div>
                <div className="font-serif text-3xl font-semibold text-[#2C1E16]">1,950m</div>
                <div className="text-[11px] uppercase tracking-wider text-[#2C1E16]/60 mt-0.5">Average Farm Altitude</div>
              </div>
              <div className="h-8 w-px bg-[#2C1E16]/10" />
              <div>
                <div className="font-serif text-3xl font-semibold text-[#2C1E16]">91.5+</div>
                <div className="text-[11px] uppercase tracking-wider text-[#2C1E16]/60 mt-0.5">SCA Specialty Score</div>
              </div>
              <div className="h-8 w-px bg-[#2C1E16]/10" />
              <div>
                <div className="font-serif text-3xl font-semibold text-[#2C1E16]">12</div>
                <div className="text-[11px] uppercase tracking-wider text-[#2C1E16]/60 mt-0.5">Global Roasting Awards</div>
              </div>
            </div>
          </div>

          {/* Story Image Collage */}
          <div className="relative">
            <div className="bg-[#FFFFFF] p-3 rounded-3xl border border-[#2C1E16]/10 shadow-xs relative z-10">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80"
                alt="Aura Roastery Drum Coffee Beans"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl"
              />
            </div>

            {/* Floating Overlay Badge */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-[#FFFFFF] p-4 sm:p-5 rounded-2xl border border-[#2C1E16]/10 shadow-md max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2C1E16] text-[#FAF7F2] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-sm font-semibold text-[#2C1E16]">Best Specialty Roastery 2025</div>
                  <div className="text-[10px] text-[#2C1E16]/60">European Coffee Awards</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 4-Step Craft Process */}
        <div className="mt-20">
          <h3 className="font-serif text-3xl font-normal text-center text-[#2C1E16] mb-12">
            The Aura Precision Process
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'High-Altitude Harvest',
                desc: 'Hand-picked ripe red Arabica cherries from volcanic mountain soils in Colombia & Ethiopia.',
              },
              {
                step: '02',
                title: 'Cast-Iron Roasting',
                desc: 'Slow drum-roasted in small 5kg batches to lock in delicate floral esters and caramel sugars.',
              },
              {
                step: '03',
                title: 'Sensory Cupping',
                desc: 'Every single batch is cupped and evaluated by Q-Graders before entering the espresso bar.',
              },
              {
                step: '04',
                title: 'Artisanal Extraction',
                desc: 'Pressure-profiled extractions served in temperature-stable ceramic at exact golden ratios.',
              },
            ].map((p) => (
              <div
                key={p.step}
                className="editorial-card p-6 rounded-2xl"
              >
                <div className="font-serif text-3xl font-bold text-[#A67C52] mb-2">
                  {p.step}
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#2C1E16] mb-2">{p.title}</h4>
                <p className="text-xs text-[#2C1E16]/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
