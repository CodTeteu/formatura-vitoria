import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, Copy, MapPin, Navigation, Shirt, Clock, ChevronDown, Users, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { inviteData } from "@/config/invite";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import { copyToClipboard } from "@/lib/format";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/cn";

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"];

const quickNoteIcons: Record<string, any> = {
  "Traje": Shirt,
  "Confirmação": Users,
  "Fotos": Camera,
};

export function CelebrationSection() {
  const [copyingText, setCopyingText] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    // Initial check
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  async function handleCopyAddress(address: string) {
    try {
      setCopyingText(address);
      await copyToClipboard(address);
      toast.success("Endereço copiado com sucesso.");
    } catch {
      toast.error("Não foi possível copiar o endereço.");
    } finally {
      setTimeout(() => setCopyingText(null), 2000);
    }
  }

  return (
    <section className="invite-section relative overflow-hidden !pb-12 !pt-6 sm:!pb-16 sm:!pt-10" id="celebracao">
      {/* Background blobs for depth */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--invite-gold)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--invite-brown)] rounded-full blur-3xl" />
      </div>

      <div className="invite-container relative z-10">
        <SectionHeading
          align="center"
          label={inviteData.celebration.label}
          title={inviteData.celebration.title}
        />

        <div className="relative max-w-3xl mx-auto mt-12 sm:mt-16 -mx-4 sm:mx-0 md:px-0">
          {/* Previous Button */}
          <button
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            disabled={!canScrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-white/90 border border-[var(--invite-line)] shadow-md backdrop-blur-sm text-[var(--invite-brown)] transition-all duration-300 hover:bg-white active:scale-95 disabled:opacity-0 disabled:pointer-events-none sm:left-4"
            aria-label="Evento anterior"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => emblaApi && emblaApi.scrollNext()}
            disabled={!canScrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-white/90 border border-[var(--invite-line)] shadow-md backdrop-blur-sm text-[var(--invite-brown)] transition-all duration-300 hover:bg-white active:scale-95 disabled:opacity-0 disabled:pointer-events-none sm:right-4"
            aria-label="Próximo evento"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="overflow-hidden px-4 py-4" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6 lg:-ml-8">
              {inviteData.events.map((event) => (
                <div
                  key={event.id}
                  className="min-w-0 pl-4 md:pl-6 lg:pl-8 flex-[0_0_100%] flex"
                >
                  <div
                    className="event-card flex flex-col justify-between w-full p-6 xs:p-8 sm:p-10 relative group overflow-hidden h-full min-h-[580px] xs:min-h-[620px] sm:min-h-[660px] md:min-h-[700px]"
                  >
                    {/* Inner Gold Frame decoration */}
                    <div className="absolute inset-3.5 border-2 border-[#bda073]/40 rounded-[28px] pointer-events-none" />

                    <div className="relative z-10 flex-1 flex flex-col">
                      {/* Framed Image */}
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-md border-2 border-[#bda073]/30 relative">
                        <ResponsiveImage
                          asset={event.imageAsset}
                          alt={event.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          style={{ objectPosition: event.id === "festa" ? "center top" : "center center" }}
                        />
                      </div>

                      {/* Event Info Header */}
                      <div className="pt-5 pb-3 px-1 text-center flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 justify-center mb-3.5 px-4.5 py-2 bg-gradient-to-r from-[#2c050b] to-[#5e101a] text-[#fffdfa] rounded-full border-2 border-[#bda073]/70 shadow-[0_3px_10px_rgba(44,5,11,0.15)]">
                          <Clock className="w-4 h-4 text-[#fffdfa]" strokeWidth={2.5} />
                          <span className="font-sans text-[10px] xs:text-xs font-bold uppercase tracking-[0.25em]">{event.name}</span>
                        </div>
                        <p className="font-serif text-xl xs:text-2xl sm:text-3xl font-extrabold text-[#2c050b] tracking-wide mt-2">
                          {event.dateLong}
                        </p>
                        <p className="font-script text-4xl xs:text-5xl sm:text-6xl text-[#9b7a42] mt-2 drop-shadow-[0_1.5px_1px_rgba(255,255,255,0.9)]">
                          às {event.timeText}
                        </p>
                      </div>

                      {/* Details box */}
                      <div className="px-1 pb-3 flex-1 flex flex-col justify-between">
                        <div className="text-center mb-4">
                          <p className="font-sans text-[10px] xs:text-xs uppercase tracking-[0.35em] text-[#9b7a42] font-extrabold mb-1.5">Local</p>
                          <p className="font-serif text-lg xs:text-xl sm:text-2xl text-[#2c050b] font-extrabold tracking-wide leading-snug">{event.venueName}</p>
                        </div>

                        {/* Address box with copy action */}
                        <div className="group/copy flex items-center justify-between gap-3 rounded-2xl border-2 border-[#bda073]/20 bg-[#fffbf7]/80 hover:bg-white px-4 py-3 transition-all duration-300 mb-3.5 shadow-sm hover:shadow-md cursor-pointer">
                          <p className="flex-1 font-sans text-xs xs:text-sm leading-relaxed text-[#5e101a]/90 text-center pl-3">
                            {event.venue}
                          </p>
                          <button
                            onClick={() => void handleCopyAddress(event.venue)}
                            className="text-[#9b7a42] transition-colors hover:text-[#2c050b] p-1.5 shrink-0 cursor-pointer"
                            title="Copiar endereço"
                          >
                            {copyingText === event.venue ? (
                              <Check className="size-4 text-[var(--invite-sage)]" strokeWidth={2.5} />
                            ) : (
                              <Copy className="size-4" strokeWidth={2} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="relative z-10 pt-1 flex flex-col gap-3 px-1 pb-1">
                      <a
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3b0911] via-[#2c050b] to-[#420a13] text-white px-5 py-4 rounded-full font-sans tracking-[0.2em] text-xs xs:text-sm font-bold transition-all duration-300 shadow-[0_6px_20px_rgba(44,5,11,0.25)] hover:shadow-[0_8px_30px_rgba(44,5,11,0.35)] active:scale-[0.98] border-2 border-[#bda073] hover:brightness-110"
                        href={buildGoogleCalendarUrl({
                          title: `${event.name} — Vitória Cézar`,
                          details: `Comemoração da formatura em Direito de Vitória Cézar. Evento: ${event.name}.`,
                          location: `${event.venueName}, ${event.venue}`,
                          startsAt: event.startsAt,
                        })}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Calendar className="w-4 h-4 text-[#fffdfa]" strokeWidth={2.5} />
                        SALVAR NA AGENDA
                      </a>
                      <div className="grid grid-cols-2 gap-3">
                        <a
                          className="inline-flex items-center justify-center gap-1.5 bg-[#fffdfa] hover:bg-[#fffcf7] text-[#2c050b] border-2 border-[#bda073] px-3 py-3.5 rounded-full font-sans text-[11px] xs:text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
                          href={event.mapsUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <MapPin className="w-4 h-4 text-[#9b7a42]" strokeWidth={2} />
                          Google Maps
                        </a>
                        <a
                          className="inline-flex items-center justify-center gap-1.5 bg-[#fffdfa] hover:bg-[#fffcf7] text-[#2c050b] border-2 border-[#bda073] px-3 py-3.5 rounded-full font-sans text-[11px] xs:text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
                          href={event.wazeUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Navigation className="w-4 h-4 text-[#9b7a42]" strokeWidth={2} />
                          Waze
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots (Only visible when there's scrolling, e.g., on mobile/tablet) */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  index === selectedIndex
                    ? "w-6 bg-[var(--invite-gold)]"
                    : "w-2 bg-[var(--invite-gold)]/30"
                )}
                onClick={() => scrollTo(index)}
                aria-label={`Ir para evento ${index + 1}`}
              />
            ))}
          </div>

          {/* Drag Cue Helper */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--invite-gold)] mt-5 animate-pulse md:hidden">
            <span>Arraste para o lado</span>
            <span className="inline-block animate-horizontal-bounce text-sm">↔</span>
          </div>
        </div>

        {/* Manual do Convidado — Desktop Grid */}
        {inviteData.celebration.quickNotes.length > 0 && (
          <>
            <div className="hidden md:grid md:grid-cols-3 gap-y-16 gap-x-8 mt-20">
              {inviteData.celebration.quickNotes.map((note, index) => {
                const Icon = quickNoteIcons[note.title] ?? Clock;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-14 h-14 bg-[var(--invite-brown)]/10 rounded-full flex items-center justify-center mb-5 text-[var(--invite-brown)] group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <h4 className="font-heading text-base text-[var(--invite-brown)] mb-2 tracking-wide font-semibold">{note.title}</h4>
                    <p className="font-sans text-sm text-[var(--invite-brown-soft)]/75 leading-relaxed px-2 mb-4">
                      {note.description}
                    </p>
                    <div className="w-10 h-[2px] bg-[var(--invite-line)] opacity-50 group-hover:bg-[var(--invite-gold)]/30 transition-colors duration-500" />
                  </div>
                );
              })}
            </div>

            {/* Manual do Convidado — Mobile Accordion */}
            <div className="block md:hidden mt-12 divide-y divide-[var(--invite-brown)]/10 border-t border-b border-[var(--invite-brown)]/10">
              {inviteData.celebration.quickNotes.map((note, index) => {
                const isExpanded = expandedItem === note.title;
                return (
                  <div key={index} className="overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpandedItem(isExpanded ? null : note.title)}
                      className="w-full flex items-center justify-between py-5 text-left transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-heading text-xs text-[var(--invite-brown)]/60 tracking-[0.2em] font-light">
                          {ROMAN_NUMERALS[index] || index + 1}
                        </span>
                        <span className="text-[var(--invite-brown)]/20 font-light">|</span>
                        <h4 className="font-heading text-base text-[var(--invite-brown)] tracking-wide font-normal">
                          {note.title}
                        </h4>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[var(--invite-brown)]/60"
                      >
                        <ChevronDown className="w-4 h-4 stroke-[1.2]" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="pb-5 pl-10 pr-2 font-sans text-sm text-[var(--invite-brown-soft)]/80 leading-relaxed">
                            {note.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
