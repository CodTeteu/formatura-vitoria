import { useEffect, useRef } from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import { Navigation } from "@/components/layout/Navigation";
import { CelebrationSection } from "@/components/sections/CelebrationSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { QuickActionsSection } from "@/components/sections/QuickActionsSection";
import { GiftListCalloutSection } from "@/components/sections/GiftListCalloutSection";
import { syncPendingSubmissions, getPendingCount } from "@/lib/pending-rsvp";
import { toast } from "sonner";

export default function HomePage() {
  const synced = useRef(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (synced.current) return;
    synced.current = true;

    const count = getPendingCount();
    if (count === 0) return;

    syncPendingSubmissions().then((result) => {
      if (result.synced > 0) {
        toast.success(
          `${result.synced} confirmação(ões) pendente(s) foram enviadas com sucesso!`,
        );
      }
    });
  }, []);

  return (
    <div className="invite-page">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--invite-gold)] origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navigation />
      <main className="relative z-[1]">
        <HeroSection />
        <div className="invite-texture-surface">
          <QuickActionsSection />
          
          <GallerySection />
          
          <CelebrationSection />
          
          <GiftListCalloutSection />
          
          <RSVPSection />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
