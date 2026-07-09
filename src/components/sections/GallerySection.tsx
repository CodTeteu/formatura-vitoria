import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { inviteData } from "@/config/invite";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const PREVIEW_PARAGRAPH_COUNT = 2;

export function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 3600, stopOnInteraction: false }),
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const openLightbox = (index: number) => {
    setSelectedPhoto(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = "";
  };

  const goToPrev = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(
        selectedPhoto === 0 ? inviteData.familyGallery.slides.length - 1 : selectedPhoto - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(
        selectedPhoto === inviteData.familyGallery.slides.length - 1 ? 0 : selectedPhoto + 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedPhoto === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto]);

  return (
    <section id="galeria" className="pt-12 pb-10 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <p className="font-body text-[var(--invite-gold)] uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            {inviteData.familyGallery.label}
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-[var(--invite-brown)] mb-4">
            {inviteData.familyGallery.title}
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--invite-gold)] to-transparent mx-auto" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {inviteData.familyGallery.slides.map((photo, index) => {
                const isLandscape = photo.aspect === "landscape";
                return (
                  <div
                    key={photo.asset}
                    className={cn(
                      "min-w-0 pl-4 transition-all duration-300",
                      isLandscape
                        ? "flex-[0_0_95%] sm:flex-[0_0_90%] md:flex-[0_0_70%] lg:flex-[0_0_56%]"
                        : "flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_35%] lg:flex-[0_0_28%]"
                    )}
                  >
                    <motion.div
                      className="group relative cursor-pointer overflow-hidden rounded-[24px] bg-white shadow-lg border border-[var(--invite-line)]/35"
                      whileHover={{ scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => openLightbox(index)}
                    >
                      <div className={cn("overflow-hidden", isLandscape ? "aspect-[3/2]" : "aspect-[3/4]")}>
                        <ResponsiveImage
                          asset={photo.asset}
                          alt={photo.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Gradient Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <span className="text-white text-xs uppercase tracking-widest bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          Ampliar Foto 🔍
                        </span>
                      </div>
                    </motion.div>
                    {photo.caption && (
                      <p className="mt-3 px-2 text-center font-body text-sm text-[var(--invite-brown-soft)]/80 italic">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-6 md:mt-10">
            <button
              className="rounded-full w-12 h-12 border border-[var(--invite-line)] text-[var(--invite-brown)] hover:bg-[var(--invite-brown)] hover:text-white transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center bg-white/50 backdrop-blur-sm cursor-pointer"
              onClick={scrollPrev}
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="rounded-full w-12 h-12 border border-[var(--invite-line)] text-[var(--invite-brown)] hover:bg-[var(--invite-brown)] hover:text-white transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center bg-white/50 backdrop-blur-sm cursor-pointer"
              onClick={scrollNext}
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paragraphs and Read More details */}
        <Reveal className="mt-12 max-w-3xl mx-auto" delay={0.1}>
          <div className="space-y-5 text-center text-[var(--invite-brown-soft)] md:text-left leading-relaxed">
            {isExpanded ? (
              <>
                {inviteData.familyGallery.paragraphs.map((paragraph, index) => (
                  <p className="font-body text-lg md:text-xl" key={paragraph}>
                    {paragraph}
                    {index === inviteData.familyGallery.paragraphs.length - 1 && (
                      <button
                        className="ml-3 inline-flex font-heading text-[0.75rem] font-bold uppercase tracking-[0.25em] text-[var(--invite-gold)] transition-colors hover:text-[var(--invite-brown)] cursor-pointer"
                        onClick={() => setIsExpanded(false)}
                        type="button"
                      >
                        Ler menos
                      </button>
                    )}
                  </p>
                ))}
              </>
            ) : (
              <>
                {inviteData.familyGallery.paragraphs
                  .slice(0, PREVIEW_PARAGRAPH_COUNT)
                  .map((paragraph, index) => (
                    <p className="font-body text-lg md:text-xl" key={paragraph}>
                      {paragraph}
                      {index === PREVIEW_PARAGRAPH_COUNT - 1 && (
                        <>
                          ...
                          <button
                            className="ml-3 inline-flex font-heading text-[0.75rem] font-bold uppercase tracking-[0.25em] text-[var(--invite-gold)] transition-colors hover:text-[var(--invite-brown)] cursor-pointer"
                            onClick={() => setIsExpanded(true)}
                            type="button"
                          >
                            Ver mais
                          </button>
                        </>
                      )}
                    </p>
                  ))}
              </>
            )}
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer"
              aria-label="Fechar visualizador"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Photo Counter */}
            <div className="absolute top-4 left-4 z-[210] px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {selectedPhoto + 1} / {inviteData.familyGallery.slides.length}
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[210] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center cursor-pointer"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative max-w-[90vw] max-h-[85vh]">
              <motion.div
                key={selectedPhoto}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ResponsiveImage
                  asset={inviteData.familyGallery.slides[selectedPhoto].asset}
                  alt={inviteData.familyGallery.slides[selectedPhoto].alt}
                  className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
