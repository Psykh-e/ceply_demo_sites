import React, { useState } from 'react';
import { MenuItem, CustomDrinkOption } from '../types';
import { X, Plus, Minus } from 'lucide-react';

interface DrinkCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customization: CustomDrinkOption, quantity: number) => void;
}

export const DrinkCustomizerModal: React.FC<DrinkCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [size, setSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [milk, setMilk] = useState<
    'Whole Milk' | 'Oat Milk (+ $0.75)' | 'Almond Milk (+ $0.75)' | 'Pistachio Milk (+ $1.00)' | 'None'
  >('Oat Milk (+ $0.75)');
  const [sweetness, setSweetness] = useState<
    'Unsweetened (0%)' | 'Light (25%)' | 'Standard (100%)' | 'Extra Sweet'
  >('Standard (100%)');
  const [shots, setShots] = useState<number>(2);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');

  // Calculate Price Additions
  let sizeAddon = 0;
  if (size === 'Medium') sizeAddon = 0.5;
  if (size === 'Large') sizeAddon = 1.0;

  let milkAddon = 0;
  if (milk.includes('+$0.75') || milk.includes('+ $0.75')) milkAddon = 0.75;
  if (milk.includes('+$1.00') || milk.includes('+ $1.00')) milkAddon = 1.0;

  let shotAddon = (shots - 2) > 0 ? (shots - 2) * 1.0 : 0;

  const unitPrice = item.price + sizeAddon + milkAddon + shotAddon;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(
      item,
      {
        size,
        milk,
        sweetness,
        shots,
        notes,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C1E16]/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#2C1E16]/15 rounded-3xl overflow-hidden shadow-xl max-h-[90vh] flex flex-col text-[#2C1E16]">
        {/* Modal Header */}
        <div className="relative h-48 overflow-hidden shrink-0 bg-[#F2EBDC]">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E16]/80 via-[#2C1E16]/30 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF7F2] text-[#2C1E16] hover:bg-[#A67C52] hover:text-[#FAF7F2] transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-[#FAF7F2]">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FAF7F2] bg-[#A67C52] px-2.5 py-1 rounded-md">
              {item.origin ? `Origin: ${item.origin}` : 'Signature Craft'}
            </span>
            <h3 className="font-serif text-2xl font-medium mt-1.5">{item.name}</h3>
          </div>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#2C1E16]">
          <p className="text-xs text-[#2C1E16]/70 leading-relaxed">{item.description}</p>

          {/* Flavor Notes */}
          {item.notes && item.notes.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-[#8C5E38] uppercase tracking-wider block mb-2">
                Tasting Notes
              </label>
              <div className="flex flex-wrap gap-2">
                {item.notes.map((note) => (
                  <span
                    key={note}
                    className="text-xs bg-[#FAF7F2] text-[#2C1E16] px-3 py-1 rounded-md border border-[#2C1E16]/10"
                  >
                    • {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Size Choice */}
          <div>
            <label className="text-xs font-semibold text-[#2C1E16] uppercase tracking-wider block mb-2">
              Select Cup Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Small', 'Medium', 'Large'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    size === s
                      ? 'bg-[#2C1E16] text-[#FAF7F2] border-[#2C1E16] font-semibold shadow-xs'
                      : 'bg-[#FAF7F2] text-[#2C1E16]/70 border-[#2C1E16]/15 hover:border-[#A67C52]'
                  }`}
                >
                  {s} {s === 'Medium' && '(+$0.50)'} {s === 'Large' && '(+$1.00)'}
                </button>
              ))}
            </div>
          </div>

          {/* Milk Choice */}
          <div>
            <label className="text-xs font-semibold text-[#2C1E16] uppercase tracking-wider block mb-2">
              Milk Preference
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Whole Milk',
                'Oat Milk (+ $0.75)',
                'Almond Milk (+ $0.75)',
                'Pistachio Milk (+ $1.00)',
                'None',
              ].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMilk(m as any)}
                  className={`py-2 px-3 rounded-xl text-xs text-left border transition-all ${
                    milk === m
                      ? 'bg-[#2C1E16] text-[#FAF7F2] border-[#2C1E16] font-semibold'
                      : 'bg-[#FAF7F2] text-[#2C1E16]/70 border-[#2C1E16]/15 hover:border-[#A67C52]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Sweetness */}
          <div>
            <label className="text-xs font-semibold text-[#2C1E16] uppercase tracking-wider block mb-2">
              Sweetness Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Unsweetened (0%)',
                'Light (25%)',
                'Standard (100%)',
                'Extra Sweet',
              ].map((sw) => (
                <button
                  key={sw}
                  type="button"
                  onClick={() => setSweetness(sw as any)}
                  className={`py-2 px-3 rounded-xl text-xs text-left border transition-all ${
                    sweetness === sw
                      ? 'bg-[#2C1E16] text-[#FAF7F2] border-[#2C1E16] font-semibold'
                      : 'bg-[#FAF7F2] text-[#2C1E16]/70 border-[#2C1E16]/15 hover:border-[#A67C52]'
                  }`}
                >
                  {sw}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Espresso Shots */}
          <div className="flex items-center justify-between bg-[#FAF7F2] p-3.5 rounded-xl border border-[#2C1E16]/10">
            <div>
              <span className="text-xs font-semibold text-[#2C1E16] block">Espresso Shots</span>
              <span className="text-[11px] text-[#2C1E16]/60">Standard double shot included</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShots(Math.max(1, shots - 1))}
                className="w-8 h-8 rounded-lg bg-[#2C1E16] text-[#FAF7F2] hover:bg-[#A67C52] flex items-center justify-center transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-[#2C1E16] w-4 text-center">{shots}</span>
              <button
                type="button"
                onClick={() => setShots(Math.min(4, shots + 1))}
                className="w-8 h-8 rounded-lg bg-[#2C1E16] text-[#FAF7F2] hover:bg-[#A67C52] flex items-center justify-center transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="text-xs font-semibold text-[#2C1E16] uppercase tracking-wider block mb-1">
              Barista Instructions
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra hot, served in ceramic mug"
              className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2 text-xs text-[#2C1E16] focus:outline-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#FAF7F2] border-t border-[#2C1E16]/10 flex items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-3 bg-[#FFFFFF] p-1.5 rounded-xl border border-[#2C1E16]/15">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-[#2C1E16] text-[#FAF7F2] flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-semibold text-[#2C1E16] px-1">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-[#2C1E16] text-[#FAF7F2] flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3.5 px-6 rounded-xl bg-[#2C1E16] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider flex items-center justify-between shadow-xs hover:bg-[#422D22] transition-colors"
          >
            <span>Add To Order Bag</span>
            <span>${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
