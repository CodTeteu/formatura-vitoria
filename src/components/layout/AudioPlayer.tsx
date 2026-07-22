import { useState, useEffect } from "react";
import { Music, Volume2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerProps {
  isScrolled?: boolean;
}

const MUSIC_URL = "/assets/graduation-song.mp4";

// Single audio instance shared across all mounts of AudioPlayer
let sharedAudio: HTMLAudioElement | null = null;
const listeners = new Set<(isPlaying: boolean) => void>();

let started = false;

const getSharedAudio = () => {
  if (typeof window === "undefined") return null;
  
  if (!sharedAudio) {
    const audioUrl = MUSIC_URL.startsWith('http')
      ? MUSIC_URL
      : `${import.meta.env.BASE_URL || '/'}${MUSIC_URL.replace(/^\//, '')}`;
    
    sharedAudio = new Audio(audioUrl);
    sharedAudio.loop = true;
    sharedAudio.volume = 1.0; 

    // Sync state if audio plays or pauses
    sharedAudio.addEventListener("play", () => {
      if (!started && sharedAudio) {
        sharedAudio.currentTime = 20;
        started = true;
      }
      listeners.forEach(listener => listener(true));
    });
    sharedAudio.addEventListener("pause", () => {
      listeners.forEach(listener => listener(false));
    });
    sharedAudio.addEventListener("ended", () => {
      listeners.forEach(listener => listener(false));
    });
  }
  return sharedAudio;
};

/**
 * AudioPlayer Component
 * Compact background music player for the top navbar
 */
export function AudioPlayer({ isScrolled = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(() => {
    const audio = getSharedAudio();
    return audio ? !audio.paused : false;
  });
  const [showBubble, setShowBubble] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    const listener = (playing: boolean) => {
      setIsPlaying(playing);
      if (playing) setShowBubble(false);
    };
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
      // If no players are mounted on the screen, pause the audio to prevent leaks
      if (listeners.size === 0 && sharedAudio) {
        sharedAudio.pause();
      }
    };
  }, []);

  // Control the tooltip/bubble entry delay
  useEffect(() => {
    if (isPlaying) return;

    const timer = setTimeout(() => {
      if (!isPlaying && !hasDismissed) {
        setShowBubble(true);
      }
    }, 3000); // 3 seconds delay before showing the tip bubble

    return () => clearTimeout(timer);
  }, [isPlaying, hasDismissed]);

  // Handle auto-dismissal after 10 seconds
  useEffect(() => {
    if (showBubble) {
      const dismissTimer = setTimeout(() => {
        setShowBubble(false);
      }, 10000); // 10 seconds display duration

      return () => clearTimeout(dismissTimer);
    }
  }, [showBubble]);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    const audio = getSharedAudio();
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play()
        .catch((err) => {
          console.log("Audio play blocked by browser:", err);
        });
    }
  };

  const handleDismissBubble = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setHasDismissed(true);
  };

  // Button styles based on header scroll state
  const buttonColorClass = isScrolled
    ? "text-[var(--invite-brown)] border-[var(--invite-line)] hover:bg-[var(--invite-sage-soft)]/20"
    : "text-white border-white/20 hover:bg-white/5";

  return (
    <div className="flex items-center relative z-50">
      {/* Native HTML button to ensure reliable user gesture detection on mobile devices */}
      <button
        onClick={togglePlay}
        className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-300 relative hover:scale-105 active:scale-95 ${
          isPlaying
            ? "bg-[var(--invite-brown)] border-[var(--invite-brown)] text-white"
            : buttonColorClass
        }`}
        aria-label="Tocar música de fundo"
      >
        {/* Pulsing Outer Rings when Playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-[var(--invite-brown)]/25 animate-ping pointer-events-none" />
        )}

        {/* spinning icon */}
        <div
          className="flex items-center justify-center transition-transform duration-500"
          style={{
            animation: isPlaying ? "spin 20s linear infinite" : "none"
          }}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <Music className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </div>
      </button>

      {/* Floating Chat Bubble Style Tooltip */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={togglePlay}
            className="absolute top-11 md:top-12 right-0 w-52 bg-white/95 border border-[var(--invite-line)] rounded-xl p-2.5 pr-6 shadow-[var(--invite-shadow)] text-left z-50 cursor-pointer pointer-events-auto group/bubble select-none"
          >
            {/* Elegant Top Arrow pointing to the music button */}
            <div className="absolute bottom-full right-[14px] md:right-[15px] w-2 h-2 bg-white border-l border-t border-[var(--invite-line)] transform rotate-45 translate-y-[5px]" />
            
            {/* Close Button */}
            <button
              onClick={handleDismissBubble}
              className="absolute top-1.5 right-1.5 p-0.5 rounded-full text-[var(--invite-brown-soft)]/50 hover:text-[var(--invite-brown)] hover:bg-black/5 transition-colors"
              aria-label="Fechar dica"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Bubble Content */}
            <p className="font-body text-xs text-[var(--invite-brown)] leading-normal font-medium">
              Toque para ouvir a música e ter uma experiência mais completa ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
