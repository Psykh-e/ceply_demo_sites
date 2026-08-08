import React, { useState } from 'react';
import { REVIEWS as INITIAL_REVIEWS } from '../data/coffeeData';
import { Review } from '../types';
import { Sparkles, Star, Plus, MessageSquareQuote, X } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(INITIAL_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [favoriteDrink, setFavoriteDrink] = useState('Velvet Gold Latte');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `r-${Date.now()}`,
      author,
      role: role.trim() || 'Verified Coffee Patron',
      rating,
      comment,
      date: 'Just now',
      avatar: `https://picsum.photos/seed/${author.replace(/\s+/g, '')}/200/200`,
      favoriteDrink,
    };

    setReviewsList([newRev, ...reviewsList]);
    setModalOpen(false);
    // Reset form
    setAuthor('');
    setRole('');
    setComment('');
  };

  return (
    <section id="reviews" className="py-24 bg-[#F5EFE6] relative border-t border-[#2C1E16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/20 text-[#8C5E38] text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Patron Praise
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#2C1E16]">
              Accolades & Stories
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#FFFFFF] px-4 py-2.5 rounded-full border border-[#2C1E16]/10 flex items-center gap-3 shadow-xs">
              <div className="flex items-center text-[#A67C52]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-serif font-bold text-[#2C1E16] text-sm">4.98 / 5.0</span>
              <span className="text-xs text-[#2C1E16]/50 border-l border-[#2C1E16]/10 pl-3">
                1,240+ Verified Reviews
              </span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C1E16] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#422D22] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Review
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="editorial-card p-6 rounded-2xl flex flex-col justify-between relative"
            >
              <MessageSquareQuote className="w-8 h-8 text-[#A67C52]/20 absolute top-6 right-6" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#A67C52] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#2C1E16]/80 italic leading-relaxed mb-6 font-serif">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#2C1E16]/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#2C1E16]/10"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#2C1E16]">{rev.author}</h4>
                    <span className="text-[10px] text-[#2C1E16]/50 block">{rev.role}</span>
                  </div>
                </div>

                <span className="text-[10px] font-medium text-[#8C5E38] bg-[#A67C52]/10 px-2.5 py-0.5 rounded-md border border-[#A67C52]/20">
                  {rev.favoriteDrink}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Review Form Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-[#2C1E16]/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FFFFFF] border border-[#2C1E16]/15 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-md">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#2C1E16]/50 hover:text-[#2C1E16]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-2xl font-semibold text-[#2C1E16] mb-1">Leave a Patron Review</h3>
              <p className="text-xs text-[#2C1E16]/60 mb-6">Share your coffee experience with our community.</p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. David Vance"
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-[#2C1E16] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Title or Profession</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Architect, Soho Resident"
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-[#2C1E16] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className={`p-2 rounded-lg border transition-colors ${
                          s <= rating
                            ? 'bg-[#A67C52]/10 border-[#A67C52] text-[#8C5E38]'
                            : 'bg-[#FAF7F2] border-[#2C1E16]/15 text-[#2C1E16]/40'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${s <= rating ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Favorite Beverage</label>
                  <input
                    type="text"
                    value={favoriteDrink}
                    onChange={(e) => setFavoriteDrink(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-[#2C1E16] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Review Message</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the coffee extraction, atmosphere, or service..."
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-[#2C1E16] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#2C1E16] text-[#FAF7F2] font-semibold uppercase tracking-wider text-xs shadow-xs hover:bg-[#422D22] transition-colors"
                >
                  Publish Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
