import React, { useState } from 'react';
import { MenuItem, CustomDrinkOption, OrderItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedMenu } from './components/FeaturedMenu';
import { DrinkCustomizerModal } from './components/DrinkCustomizerModal';
import { RoastFinderQuiz } from './components/RoastFinderQuiz';
import { AboutStory } from './components/AboutStory';
import { GallerySection } from './components/GallerySection';
import { CustomerReviews } from './components/CustomerReviews';
import { ReservationModal } from './components/ReservationModal';
import { OrderBagDrawer } from './components/OrderBagDrawer';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);

  // Add customized drink to bag
  const handleAddToCart = (
    menuItem: MenuItem,
    customization: CustomDrinkOption,
    quantity: number
  ) => {
    let sizeAddon = 0;
    if (customization.size === 'Medium') sizeAddon = 0.5;
    if (customization.size === 'Large') sizeAddon = 1.0;

    let milkAddon = 0;
    if (customization.milk.includes('+$0.75') || customization.milk.includes('+ $0.75')) milkAddon = 0.75;
    if (customization.milk.includes('+$1.00') || customization.milk.includes('+ $1.00')) milkAddon = 1.0;

    let shotAddon = (customization.shots - 2) > 0 ? (customization.shots - 2) * 1.0 : 0;

    const unitPrice = menuItem.price + sizeAddon + milkAddon + shotAddon;
    const itemTotalPrice = unitPrice * quantity;

    const newOrderItem: OrderItem = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      menuItem,
      customization,
      quantity,
      itemTotalPrice,
    };

    setOrderItems((prev) => [...prev, newOrderItem]);
    setIsBagOpen(true);
  };

  // Quick add default customization
  const handleQuickAdd = (menuItem: MenuItem) => {
    handleAddToCart(
      menuItem,
      {
        size: 'Medium',
        milk: 'Oat Milk (+ $0.75)',
        sweetness: 'Standard (100%)',
        shots: 2,
      },
      1
    );
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const singleUnitPrice = item.itemTotalPrice / item.quantity;
            return {
              ...item,
              quantity: newQty,
              itemTotalPrice: singleUnitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearBag = () => {
    setOrderItems([]);
  };

  const scrollToQuiz = () => {
    const el = document.getElementById('roast-quiz');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1E16] flex flex-col font-sans selection:bg-[#A67C52] selection:text-[#FAF7F2]">
      {/* Sticky Navigation */}
      <Navbar
        orderCount={orderItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenRoastQuiz={scrollToQuiz}
      />

      {/* Hero Section */}
      <Hero
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenRoastQuiz={scrollToQuiz}
      />

      {/* Featured Menu */}
      <FeaturedMenu
        onSelectItem={(item) => setCustomizerItem(item)}
        onQuickAdd={handleQuickAdd}
      />

      {/* Interactive Roast Finder Quiz */}
      <RoastFinderQuiz
        onSelectItem={(item) => setCustomizerItem(item)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Heritage & Sourcing Story */}
      <AboutStory />

      {/* Gallery */}
      <GallerySection />

      {/* Patron Reviews */}
      <CustomerReviews />

      {/* Contact & Map */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Drink Customization Modal */}
      <DrinkCustomizerModal
        item={customizerItem}
        onClose={() => setCustomizerItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Slide-over Order Bag */}
      <OrderBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        orderItems={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
      />
    </div>
  );
}
