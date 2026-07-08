import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { inviteData } from "@/config/invite";
import { useCountdown } from "@/hooks/useCountdown";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

const countdownItems = [
  { key: "days", label: "Dias" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
] as const;

export function HeroSection() {
  const containerRef = useRef(null);
  const countdown = useCountdown(inviteData.event.startsAt);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const timerComponents = countdownItems.map((item) => (
    <div
      key={item.key}
      className="flex flex-col items-center mx-1 md:mx-4 p-2 md:p-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg min-w-[60px] md:min-w-[90px]"
    >
      <span className="text-2xl md:text-4xl font-bold text-white font-heading tabular-nums leading-none">
        {String(countdown[item.key]).padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-xs text-white/70 uppercase tracking-wider mt-1.5 font-body">
        {item.label}
      </span>
    </div>
  ));

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative h-screen min-h-[600px] md:min-h-[850px] flex items-center justify-center overflow-hidden w-full bg-[#150306]"
    >
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* Mobile Hero */}
        <div className="block md:hidden w-full h-full">
          <ResponsiveImage
            asset={inviteData.hero.imageAsset}
            alt={inviteData.hero.name}
            className="w-full h-full object-cover object-[center_22%]"
            eager
            sizes="100vw"
          />
        </div>
        {/* PC Hero */}
        <div className="hidden md:block w-full h-full">
          <ResponsiveImage
            asset={inviteData.hero.imageAsset}
            alt={inviteData.hero.name}
            className="w-full h-full object-cover object-[center_40%]"
            eager
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/38 mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[var(--color-background)] from-10% to-transparent z-0 pointer-events-none" />
      </motion.div>

      {/* Mobile content: stacked flow to avoid overlap */}
      <motion.div
        className="absolute top-[38%] left-1/2 -translate-x-1/2 z-10 flex w-full max-w-[420px] flex-col items-center px-5 text-center md:hidden"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full"
        >
          <div className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-white/95 backdrop-blur-sm mb-4">
            {inviteData.hero.eyebrow}
          </div>

          <h1 className="w-full font-script text-[3.2rem] text-white drop-shadow-xl leading-none">
            {inviteData.hero.name}
          </h1>

          <p className="mt-3 text-white/95 text-sm font-heading tracking-[0.26em] uppercase">
            {inviteData.hero.courseLine}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 flex flex-nowrap justify-center gap-0.5"
        >
          {timerComponents}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}
          className="group relative mt-7 w-full max-w-[310px] px-8 py-3.5 min-h-[48px] bg-white/10 backdrop-blur-md overflow-hidden rounded-full transition-all hover:bg-white/20 border border-white/30 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="text-white font-medium tracking-widest uppercase text-xs">
            {inviteData.hero.primaryCta}
          </span>
          <span className="text-white text-sm transition-transform group-hover:translate-x-1">
            →
          </span>
        </motion.button>
      </motion.div>

      {/* Desktop name and course (Top aligned) */}
      <motion.div
        className="hidden md:block absolute top-[20%] left-1/2 -translate-x-1/2 z-10 text-center px-4 w-full max-w-4xl"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-1.5 text-xs font-semibold uppercase tracking-[0.4em] text-white/95 backdrop-blur-sm mb-5"
        >
          {inviteData.hero.eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-script text-7xl lg:text-8xl text-white mb-4 drop-shadow-xl leading-none"
        >
          {inviteData.hero.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/90 text-lg lg:text-xl font-heading tracking-[0.3em] uppercase"
        >
          {inviteData.hero.courseLine}
        </motion.p>
      </motion.div>

      {/* Desktop countdown and button (Bottom aligned) */}
      <motion.div
        className="hidden md:flex absolute bottom-[18%] left-1/2 -translate-x-1/2 z-10 text-center px-4 flex-col items-center w-full max-w-4xl"
        style={{ opacity }}
      >
        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-1 md:gap-2 mb-8"
        >
          {timerComponents}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}
          className="group relative px-9 py-4 min-h-[48px] bg-white/10 backdrop-blur-md overflow-hidden rounded-full transition-all hover:bg-white/20 border border-white/30 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="text-white font-medium tracking-widest uppercase text-xs">
            {inviteData.hero.primaryCta}
          </span>
          <span className="text-white text-sm transition-transform group-hover:translate-x-1">
            →
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 z-10 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById("graduate")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
