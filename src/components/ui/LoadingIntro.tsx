import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { inviteData } from "@/config/invite";

export function LoadingIntro() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const fallback = setTimeout(handleLoad, 4000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#2D070B] to-[#120204]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Elegant Monogram Frame */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center border border-[var(--invite-gold)]/30 rounded-full bg-white/5 shadow-inner">
              <span className="font-heading text-4xl text-[var(--invite-gold)] font-bold tracking-[0.1em] select-none">
                {inviteData.graduate.monogram || "VC"}
              </span>
              <div className="absolute inset-1.5 border border-[var(--invite-gold)]/10 rounded-full pointer-events-none" />
            </div>

            {/* Subtext */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <motion.span
                className="text-[0.65rem] tracking-[0.4em] uppercase text-[var(--invite-gold)] font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {inviteData.graduate.fullName}
              </motion.span>
              <motion.span
                className="text-[0.55rem] tracking-[0.25em] uppercase text-white/40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {inviteData.graduate.course}
              </motion.span>
            </div>

            {/* Shimmer loading bar */}
            <div className="relative mt-4 h-[2px] w-28 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute top-0 h-full bg-gradient-to-r from-transparent via-[var(--invite-gold)] to-transparent"
                initial={{ left: "-100%", width: "100%" }}
                animate={{ left: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                style={{ width: "80%" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
