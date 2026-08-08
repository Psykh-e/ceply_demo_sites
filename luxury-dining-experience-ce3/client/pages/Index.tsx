import { useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import CustomCursor from "@/components/restaurant/CustomCursor";
import Nav from "@/components/restaurant/Nav";
import MenuOverlay from "@/components/restaurant/MenuOverlay";
import Hero from "@/components/restaurant/Hero";
import Story from "@/components/restaurant/Story";
import SignatureDishes from "@/components/restaurant/SignatureDishes";
import Chef from "@/components/restaurant/Chef";
import TastingMenu from "@/components/restaurant/TastingMenu";
import Reservation from "@/components/restaurant/Reservation";
import LocationContact from "@/components/restaurant/LocationContact";
import Footer from "@/components/restaurant/Footer";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  useLenis();

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory">
      <div className="grain-overlay" />
      <CustomCursor />
      <Nav onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Hero />
        <Story />
        <SignatureDishes />
        <Chef />
        <TastingMenu />
        <Reservation />
        <LocationContact />
      </main>

      <Footer />
    </div>
  );
}
