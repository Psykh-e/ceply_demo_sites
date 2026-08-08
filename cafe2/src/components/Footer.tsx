import React, { useState } from 'react';
import { Coffee, Send, Check, Instagram, Twitter, Music, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#2C1E16] text-[#FAF7F2] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#A67C52] text-[#FAF7F2] flex items-center justify-center font-bold">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-normal tracking-wide text-[#FAF7F2]">
                AURA
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#FAF7F2]/70">
              Artisanal specialty coffee roastery based in Soho, London. Sourced directly from micro-lot farms above 1,800m altitude.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#FAF7F2]">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#FAF7F2]/10 hover:bg-[#A67C52] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#FAF7F2]/10 hover:bg-[#A67C52] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#FAF7F2]/10 hover:bg-[#A67C52] flex items-center justify-center transition-colors"
                aria-label="Spotify Lounge Playlist"
                title="Aura Ambient Lounge Playlist"
              >
                <Music className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-serif text-lg font-medium text-[#FAF7F2] mb-4">Explore</h4>
            <ul className="space-y-2 text-xs">
              {['Featured Menu', 'Flavor Profiler', 'Our Craft', 'Visual Journal', 'Patron Reviews', 'Reservations'].map(
                (item, idx) => {
                  const hrefs = ['#menu', '#roast-quiz', '#story', '#gallery', '#reviews', '#contact'];
                  return (
                    <li key={item}>
                      <a
                        href={hrefs[idx]}
                        className="hover:text-[#A67C52] transition-colors inline-block py-0.5 text-[#FAF7F2]/80"
                      >
                        {item}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          {/* Hours & Sourcing */}
          <div>
            <h4 className="font-serif text-lg font-medium text-[#FAF7F2] mb-4">Roastery Hours</h4>
            <div className="space-y-2 text-xs text-[#FAF7F2]/70">
              <p>
                <span className="text-[#FAF7F2] block font-semibold">Mon – Fri:</span>
                7:00 AM – 9:00 PM
              </p>
              <p>
                <span className="text-[#FAF7F2] block font-semibold">Sat – Sun:</span>
                8:00 AM – 10:00 PM
              </p>
              <p className="pt-2 text-[11px] text-[#A67C52]">
                • Kitchen serves fresh pastries until 4:00 PM daily.
              </p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-serif text-lg font-medium text-[#FAF7F2] mb-2">Aura Journal</h4>
            <p className="text-xs text-[#FAF7F2]/70 mb-4">
              Subscribe to receive early access to limited Geisha micro-lot releases and 10% off your first bean bag order.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
                <Check className="w-4 h-4" />
                <span>Welcome! Check your inbox for code AURA10.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#FAF7F2]/10 border border-white/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#A67C52] text-[#FAF7F2] font-semibold rounded-lg text-xs flex items-center justify-center hover:bg-[#8C5E38] transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/50 gap-4">
          <p>© {new Date().getFullYear()} Aura Coffee Artisanal Roastery Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
            <span>for specialty coffee lovers everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
