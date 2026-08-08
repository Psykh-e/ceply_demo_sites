import React, { useState } from 'react';
import { Sparkles, Coffee, RotateCcw, CheckCircle2, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS } from '../data/coffeeData';
import { MenuItem } from '../types';

interface RoastFinderQuizProps {
  onSelectItem: (item: MenuItem) => void;
  onOpenReservation: () => void;
}

export const RoastFinderQuiz: React.FC<RoastFinderQuizProps> = ({
  onSelectItem,
  onOpenReservation,
}) => {
  const [step, setStep] = useState(1);
  const [brewStyle, setBrewStyle] = useState<string>('');
  const [flavorProfile, setFlavorProfile] = useState<string>('');
  const [caffeinePref, setCaffeinePref] = useState<string>('');
  const [recommendation, setRecommendation] = useState<MenuItem | null>(null);

  const handleSelectBrew = (style: string) => {
    setBrewStyle(style);
    setStep(2);
  };

  const handleSelectFlavor = (flavor: string) => {
    setFlavorProfile(flavor);
    setStep(3);
  };

  const handleSelectCaffeine = (pref: string) => {
    setCaffeinePref(pref);

    // Calculate best matching item
    let matched = MENU_ITEMS[0];
    if (flavorProfile === 'floral') {
      matched = MENU_ITEMS.find((m) => m.id === 'm4') || MENU_ITEMS[0];
    } else if (brewStyle === 'cold') {
      matched = MENU_ITEMS.find((m) => m.id === 'm3') || MENU_ITEMS[2];
    } else if (flavorProfile === 'sweet') {
      matched = MENU_ITEMS.find((m) => m.id === 'm1') || MENU_ITEMS[0];
    } else if (flavorProfile === 'bold') {
      matched = MENU_ITEMS.find((m) => m.id === 'm2') || MENU_ITEMS[1];
    } else if (brewStyle === 'latte') {
      matched = MENU_ITEMS.find((m) => m.id === 'm6') || MENU_ITEMS[5];
    }

    setRecommendation(matched);
    setStep(4);
  };

  const resetQuiz = () => {
    setStep(1);
    setBrewStyle('');
    setFlavorProfile('');
    setCaffeinePref('');
    setRecommendation(null);
  };

  return (
    <section id="roast-quiz" className="py-24 bg-[#F5EFE6] relative border-t border-[#2C1E16]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-3xl border border-[#2C1E16]/10 relative overflow-hidden shadow-xs">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/20 text-[#8C5E38] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Flavor Profiler
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2C1E16] mb-3">
              Discover Your Signature Profile
            </h2>
            <p className="text-xs sm:text-sm text-[#2C1E16]/70">
              Answer 3 quick preferences and our master barista algorithm will pinpoint your ideal roast and extraction pairing.
            </p>
          </div>

          {/* Progress Dots */}
          {step <= 3 && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step
                      ? 'w-10 bg-[#2C1E16]'
                      : s < step
                      ? 'w-4 bg-[#A67C52]'
                      : 'w-4 bg-[#2C1E16]/15'
                  }`}
                />
              ))}
            </div>
          )}

          {/* STEP 1: Brew Style */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl sm:text-2xl text-center text-[#2C1E16]">
                1. How do you prefer your daily brew extracted?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'espresso',
                    title: 'Concentrated Espresso',
                    desc: 'Short, rich, syrup-bodied shots with thick golden crema',
                  },
                  {
                    id: 'pour-over',
                    title: 'Hand Pour-Over Chemex',
                    desc: 'Clean, floral, delicate tea-like acidity',
                  },
                  {
                    id: 'cold',
                    title: 'Nitro Cold Brew',
                    desc: 'Smooth cascading velvet texture, low acidity over ice',
                  },
                  {
                    id: 'latte',
                    title: 'Velvety Milk Latte',
                    desc: 'Steamed microfoam with organic honey & spices',
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectBrew(opt.id)}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#2C1E16]/10 hover:border-[#A67C52] text-left hover:bg-[#F2EBDC] transition-all group"
                  >
                    <div className="font-serif text-lg font-semibold text-[#2C1E16] group-hover:text-[#8C5E38] transition-colors">
                      {opt.title}
                    </div>
                    <div className="text-xs text-[#2C1E16]/60 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Flavor Profile */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl sm:text-2xl text-center text-[#2C1E16]">
                2. Which flavor palate appeals most to you?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'floral',
                    title: 'Floral & Jasmine Citrus',
                    desc: 'Bergamot, white peach, delicate tea blossom',
                  },
                  {
                    id: 'sweet',
                    title: 'Honey, Vanilla & Cinnamon',
                    desc: 'Raw honey, vanilla bean, warm bakery spice',
                  },
                  {
                    id: 'bold',
                    title: 'Dark Cocoa & Roasted Hazelnut',
                    desc: 'Molasses, high-cocoa chocolate, intense body',
                  },
                  {
                    id: 'creamy',
                    title: 'Pistachio & Sweet Milk',
                    desc: 'Nutty sweetness with silky mouthfeel',
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectFlavor(opt.id)}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#2C1E16]/10 hover:border-[#A67C52] text-left hover:bg-[#F2EBDC] transition-all group"
                  >
                    <div className="font-serif text-lg font-semibold text-[#2C1E16] group-hover:text-[#8C5E38] transition-colors">
                      {opt.title}
                    </div>
                    <div className="text-xs text-[#2C1E16]/60 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Intensity */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl sm:text-2xl text-center text-[#2C1E16]">
                3. What roast intensity do you prefer?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 'high',
                    title: 'Bold & High Kick',
                    desc: 'Deep roasted strength to energize your morning',
                  },
                  {
                    id: 'balanced',
                    title: 'Smooth & Balanced',
                    desc: 'Harmonious sweetness and subtle acidity for all-day sipping',
                  },
                  {
                    id: 'delicate',
                    title: 'Light & Nuanced',
                    desc: 'Soft complexity for slow mindful appreciation',
                  },
                  {
                    id: 'sweet-treat',
                    title: 'Indulgent Specialty Drink',
                    desc: 'Rich milk coffee with velvety house-made syrups',
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectCaffeine(opt.id)}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#2C1E16]/10 hover:border-[#A67C52] text-left hover:bg-[#F2EBDC] transition-all group"
                  >
                    <div className="font-serif text-lg font-semibold text-[#2C1E16] group-hover:text-[#8C5E38] transition-colors">
                      {opt.title}
                    </div>
                    <div className="text-xs text-[#2C1E16]/60 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RESULT */}
          {step === 4 && recommendation && (
            <div className="animate-fade-in text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Perfect Match Calculated
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#2C1E16]">
                Your Ideal Coffee Selection:
              </h3>

              <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#2C1E16]/15 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-left shadow-xs">
                <img
                  src={recommendation.image}
                  alt={recommendation.name}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-36 h-36 object-cover rounded-xl shrink-0"
                />
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8C5E38]">
                    {recommendation.origin ? `Origin: ${recommendation.origin}` : 'Signature Blend'}
                  </span>
                  <h4 className="font-serif text-2xl font-semibold text-[#2C1E16] mt-1">
                    {recommendation.name}
                  </h4>
                  <p className="text-xs text-[#2C1E16]/70 mt-1.5 line-clamp-2">
                    {recommendation.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-serif text-xl font-bold text-[#2C1E16]">
                      ${recommendation.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onSelectItem(recommendation)}
                      className="px-4 py-2 rounded-lg bg-[#2C1E16] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs hover:bg-[#422D22] transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Customize Drink
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center">
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C5E38] hover:text-[#2C1E16] transition-colors py-2 px-4"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Profiler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
