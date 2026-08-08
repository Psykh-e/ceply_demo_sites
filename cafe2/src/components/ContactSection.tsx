import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF7F2] relative border-t border-[#2C1E16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/20 text-[#8C5E38] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Visit Our Roastery
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#2C1E16] mb-4">
            Find Sanctuary at Aura
          </h2>
          <p className="text-[#2C1E16]/70 text-sm sm:text-base">
            Located in the heart of Soho. Step inside for micro-batch tastings, quiet reading, or private events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info & Location Cards */}
          <div className="space-y-6">
            {/* Address & Hours */}
            <div className="editorial-card p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#2C1E16] text-[#FAF7F2] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#2C1E16] mb-1">Our Location</h3>
                  <p className="text-xs sm:text-sm text-[#2C1E16]/70 leading-relaxed">
                    42 Artisan Way, Soho, London W1F 0BR
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C5E38] hover:underline mt-2"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Get Directions
                  </a>
                </div>
              </div>

              <div className="h-px bg-[#2C1E16]/10" />

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#2C1E16] text-[#FAF7F2] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold text-[#2C1E16] mb-2">Operating Hours</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#2C1E16]/70">
                    <div>
                      <span className="text-[#2C1E16] font-semibold block">Monday – Friday</span>
                      <span>7:00 AM – 9:00 PM</span>
                    </div>
                    <div>
                      <span className="text-[#2C1E16] font-semibold block">Saturday – Sunday</span>
                      <span>8:00 AM – 10:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#2C1E16]/10" />

              <div className="flex items-center justify-between text-xs text-[#2C1E16]/70">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#8C5E38]" /> +44 (0) 20 7946 0912
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8C5E38]" /> concierge@auracoffee.co
                </span>
              </div>
            </div>

            {/* Interactive Map Visual Card */}
            <div className="relative h-64 rounded-2xl overflow-hidden editorial-card group">
              <img
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80"
                alt="Aura Coffee Location Soho"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E16]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#FAF7F2]">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#A67C52]">
                    Soho Flagship Roastery
                  </span>
                  <h4 className="font-serif text-lg font-medium">42 Artisan Way</h4>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#FAF7F2] text-[#2C1E16] text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#A67C52] hover:text-[#FAF7F2] transition-colors"
                >
                  Open Maps
                </a>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="editorial-card p-6 sm:p-8 rounded-2xl">
            <h3 className="font-serif text-2xl font-semibold text-[#2C1E16] mb-2">Send Us a Message</h3>
            <p className="text-xs text-[#2C1E16]/60 mb-6">
              Inquire about catering, bean wholesale, coffee tasting workshops, or private events.
            </p>

            {sent ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-2xl font-semibold text-[#2C1E16]">Message Received</h4>
                <p className="text-xs text-[#2C1E16]/70">
                  Thank you for contacting us. Our concierge will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#2C1E16]">
                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Charlotte Bronte"
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-[#2C1E16] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="charlotte@example.com"
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-[#2C1E16] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-[#2C1E16] focus:outline-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Private Tasting Flights">Private Tasting Flights</option>
                    <option value="Whole Bean Subscriptions">Whole Bean Subscriptions</option>
                    <option value="Event Space Rental">Event Space Rental</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist your coffee journey today?"
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-[#2C1E16] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#2C1E16] text-[#FAF7F2] font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#422D22] transition-colors"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
