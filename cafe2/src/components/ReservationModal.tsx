import React, { useState } from 'react';
import { ReservationData } from '../types';
import { X, Calendar, CheckCircle, Copy } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [submittedPass, setSubmittedPass] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    guests: 2,
    seatingArea: 'Window Lounge',
    specialRequests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `AURA-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedPass(code);
  };

  const copyCode = () => {
    if (submittedPass) {
      navigator.clipboard.writeText(submittedPass);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetModal = () => {
    setSubmittedPass(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2C1E16]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FFFFFF] border border-[#2C1E16]/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-xl text-[#2C1E16]">
        <button
          onClick={resetModal}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-[#FAF7F2] text-[#2C1E16]/60 hover:text-[#2C1E16] border border-[#2C1E16]/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedPass ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8C5E38] mb-2">
              <Calendar className="w-4 h-4" /> Table & Bar Reservations
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C1E16] mb-1">
              Reserve Your Table
            </h3>
            <p className="text-xs text-[#2C1E16]/60 mb-6">
              Guaranteed seating at our Soho roastery. No waiting in line for specialty coffee flights.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#2C1E16]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Julian Vance"
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
                    placeholder="julian@example.com"
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-[#2C1E16] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-2.5 py-2.5 text-[#2C1E16] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Time Slot</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-2.5 py-2.5 text-[#2C1E16] focus:outline-none"
                  >
                    {['08:00 AM', '09:30 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:30 PM', '07:30 PM'].map((t) => (
                      <option key={t} value={t} className="bg-[#FAF7F2] text-[#2C1E16]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Guests</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-2.5 py-2.5 text-[#2C1E16] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map((g) => (
                      <option key={g} value={g} className="bg-[#FAF7F2] text-[#2C1E16]">
                        {g} {g === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#2C1E16] font-semibold mb-1">Preferred Atmosphere</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Main Bar',
                    'Window Lounge',
                    'Patio Garden',
                    'Private Tasting Corner',
                  ].map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setFormData({ ...formData, seatingArea: area as any })}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        formData.seatingArea === area
                          ? 'bg-[#2C1E16] text-[#FAF7F2] border-[#2C1E16] font-semibold'
                          : 'bg-[#FAF7F2] border-[#2C1E16]/15 text-[#2C1E16]/70'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#2C1E16] font-semibold mb-1">Special Requests</label>
                <input
                  type="text"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="e.g. Quiet corner, Anniversary coffee flight"
                  className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2 text-[#2C1E16] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#2C1E16] text-[#FAF7F2] font-semibold uppercase tracking-wider text-xs shadow-xs hover:bg-[#422D22] transition-colors mt-2"
              >
                Confirm Table Reservation
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Receipt */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8C5E38]">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-3xl font-semibold text-[#2C1E16] mt-1">
                We Look Forward To Welcoming You
              </h3>
            </div>

            {/* Pass Card */}
            <div className="p-6 rounded-2xl border border-[#2C1E16]/15 text-left space-y-3 bg-[#FAF7F2]">
              <div className="flex items-center justify-between border-b border-[#2C1E16]/10 pb-3">
                <span className="text-xs text-[#2C1E16]/60">Reservation Pass Code:</span>
                <span className="font-mono font-bold text-[#8C5E38] text-base">{submittedPass}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#2C1E16]/60 block">Guest Name:</span>
                  <span className="font-semibold text-[#2C1E16]">{formData.name}</span>
                </div>
                <div>
                  <span className="text-[#2C1E16]/60 block">Party Size:</span>
                  <span className="font-semibold text-[#2C1E16]">{formData.guests} Guests</span>
                </div>
                <div>
                  <span className="text-[#2C1E16]/60 block">Date & Time:</span>
                  <span className="font-semibold text-[#2C1E16]">
                    {formData.date} @ {formData.time}
                  </span>
                </div>
                <div>
                  <span className="text-[#2C1E16]/60 block">Seating Area:</span>
                  <span className="font-semibold text-[#2C1E16]">{formData.seatingArea}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F2] text-[#8C5E38] border border-[#2C1E16]/15 text-xs font-semibold"
              >
                <Copy className="w-4 h-4" /> {copied ? 'Code Copied!' : 'Copy Pass Code'}
              </button>

              <button
                onClick={resetModal}
                className="px-6 py-2.5 rounded-xl bg-[#2C1E16] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
