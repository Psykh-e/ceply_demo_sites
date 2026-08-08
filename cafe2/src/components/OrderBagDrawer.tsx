import React, { useState } from 'react';
import { OrderItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, CheckCircle } from 'lucide-react';

interface OrderBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearBag: () => void;
}

export const OrderBagDrawer: React.FC<OrderBagDrawerProps> = ({
  isOpen,
  onClose,
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMsg, setPromoMsg] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');

  // Customer Checkout Details
  const [pickupType, setPickupType] = useState<'Dine-in Table' | 'Express Counter Pickup'>('Express Counter Pickup');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [customerName, setCustomerName] = useState('');

  const subtotal = orderItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + tax);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AURA10') {
      setDiscountPercent(10);
      setPromoMsg('AURA10 applied! (10% discount)');
    } else if (promoCode.trim().toUpperCase() === 'BARISTA20') {
      setDiscountPercent(20);
      setPromoMsg('BARISTA20 applied! (20% VIP discount)');
    } else {
      setPromoMsg('Invalid code. Try "AURA10"');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;
    setCheckoutStep('confirmed');
  };

  const handleFinish = () => {
    onClearBag();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#2C1E16]/70 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] border-l border-[#2C1E16]/15 text-[#2C1E16] shadow-xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#2C1E16]/10 flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2C1E16] text-[#FAF7F2] flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#2C1E16]">Your Order Bag</h3>
                <span className="text-[11px] text-[#2C1E16]/60">
                  {orderItems.reduce((a, b) => a + b.quantity, 0)} Items
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#2C1E16]/10 text-[#2C1E16]/60 hover:text-[#2C1E16] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'cart' && (
              <>
                {orderItems.length === 0 ? (
                  <div className="text-center py-16 text-[#2C1E16]/60">
                    <ShoppingBag className="w-12 h-12 text-[#A67C52]/30 mx-auto mb-3" />
                    <p className="font-serif text-lg text-[#2C1E16]">Your order bag is empty</p>
                    <p className="text-xs mt-1">Explore our seasonal menu to add handcrafted drinks.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#2C1E16]/10 flex gap-3 relative"
                      >
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover rounded-xl shrink-0"
                        />

                        <div className="flex-1 min-w-0 pr-6">
                          <h4 className="font-serif text-sm font-semibold text-[#2C1E16] truncate">
                            {item.menuItem.name}
                          </h4>
                          <p className="text-[11px] text-[#8C5E38] font-medium">
                            {item.customization.size} • {item.customization.milk}
                          </p>

                          <div className="text-[10px] text-[#2C1E16]/60 mt-0.5 space-y-0.5">
                            <div>• Sweetness: {item.customization.sweetness}</div>
                            <div>• Shots: {item.customization.shots} Espresso</div>
                            {item.customization.notes && (
                              <div className="italic text-[#8C5E38]">"{item.customization.notes}"</div>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 bg-[#FFFFFF] px-2 py-1 rounded-lg border border-[#2C1E16]/15">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="text-[#2C1E16]/60 hover:text-[#2C1E16]"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-[#2C1E16]">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="text-[#2C1E16]/60 hover:text-[#2C1E16]"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-serif font-bold text-sm text-[#2C1E16]">
                              ${item.itemTotalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="absolute top-3 right-3 text-[#2C1E16]/40 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Promo Code Input */}
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-[#8C5E38] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Promo Code (e.g. AURA10)"
                            className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2C1E16] focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={applyPromo}
                          className="px-4 py-2 bg-[#2C1E16] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#422D22] transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoMsg && <p className="text-[11px] text-[#8C5E38] mt-1.5 font-medium">{promoMsg}</p>}
                    </div>
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs text-[#2C1E16]">
                <h4 className="font-serif text-lg font-semibold text-[#2C1E16]">Checkout Details</h4>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2.5 text-[#2C1E16] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#2C1E16] font-semibold mb-1">Order Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Express Counter Pickup', 'Dine-in Table'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setPickupType(t as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          pickupType === t
                            ? 'bg-[#2C1E16] text-[#FAF7F2] border-[#2C1E16] font-semibold'
                            : 'bg-[#FAF7F2] border-[#2C1E16]/15 text-[#2C1E16]/70'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {pickupType === 'Dine-in Table' && (
                  <div>
                    <label className="block text-[#2C1E16] font-semibold mb-1">Table Number</label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 4"
                      className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 focus:border-[#A67C52] rounded-xl px-3 py-2 text-[#2C1E16] focus:outline-none"
                    />
                  </div>
                )}

                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#2C1E16]/10 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-[#2C1E16]">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-xs text-[#8C5E38]">
                      <span>Discount ({discountPercent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span>Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#2C1E16] pt-2 border-t border-[#2C1E16]/10">
                    <span>Grand Total:</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-3 rounded-xl bg-[#FAF7F2] text-[#2C1E16]/70 text-xs uppercase font-semibold border border-[#2C1E16]/15"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#2C1E16] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider"
                  >
                    Place Barista Order
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === 'confirmed' && (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-2xl font-semibold text-[#2C1E16]">Order Placed!</h4>
                <p className="text-xs text-[#2C1E16]/70">
                  Our barista team is preparing your order. Estimated prep time: 4-6 minutes.
                </p>
                <div className="p-4 rounded-2xl border border-[#2C1E16]/10 bg-[#FAF7F2] text-left text-xs space-y-1">
                  <div>Name: <span className="font-semibold text-[#2C1E16]">{customerName}</span></div>
                  <div>Method: <span className="font-semibold text-[#8C5E38]">{pickupType}</span></div>
                  <div>Total Paid: <span className="font-semibold text-[#2C1E16]">${grandTotal.toFixed(2)}</span></div>
                </div>
                <button
                  onClick={handleFinish}
                  className="w-full py-3 rounded-xl bg-[#2C1E16] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Footer Totals & Action */}
          {checkoutStep === 'cart' && orderItems.length > 0 && (
            <div className="p-6 border-t border-[#2C1E16]/10 bg-[#FAF7F2] space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#2C1E16]/60">
                  <span>Subtotal</span>
                  <span className="text-[#2C1E16] font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8C5E38]">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#2C1E16]/60">
                  <span>Estimated Tax</span>
                  <span className="text-[#2C1E16] font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2C1E16] pt-2 border-t border-[#2C1E16]/10">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 rounded-xl bg-[#2C1E16] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs hover:bg-[#422D22] transition-colors"
              >
                Proceed To Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
