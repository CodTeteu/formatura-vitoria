import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, Copy, MapPin, Navigation, Shirt, Clock, ChevronDown, Users, Camera } from "lucide-react";
import { toast } from "sonner";
import { inviteData } from "@/config/invite";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import { copyToClipboard } from "@/lib/format";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"];

const quickNoteIcons: Record<string, any> = {
  "Traje": Shirt,
  "Confirmação": Users,
  "Fotos": Camera,
};

export function CelebrationSection() {
  const [copyingText, setCopyingText] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

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

        {/* 3 Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 sm:mt-16">
          {inviteData.events.map((event, index) => (
            <Reveal
              className="invite-card flex flex-col justify-between w-full p-4 md:p-5 relative group overflow-hidden"
              delay={index * 0.1}
              key={event.id}
            >
              {/* Inner Gold Frame decoration */}
              <div className="absolute inset-2 border border-[var(--invite-gold)]/10 rounded-[24px] pointer-events-none" />

              <div className="relative z-10 flex-1 flex flex-col">
                {/* Framed Image */}
                <div className="aspect-[16/10] overflow-hidden rounded-2xl shadow-sm border border-[var(--invite-line)]/20 relative">
                  <ResponsiveImage
                    asset={event.imageAsset}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 30vw, 100vw"
                    style={{ objectPosition: event.id === "festa" ? "center top" : "center center" }}
                  />
                </div>

                {/* Event Info Header */}
                <div className="pt-5 pb-3 px-1 text-center">
                  <div className="inline-flex items-center gap-1.5 justify-center mb-3 px-3.5 py-1.5 bg-[var(--invite-cream)]/80 text-[var(--invite-gold-deep)] rounded-full border border-[var(--invite-gold)]/25 shadow-[0_1px_4px_rgba(155,122,66,0.05)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--invite-gold)]" strokeWidth={2.2} />
                    <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em]">{event.name}</span>
                  </div>
                  <p className="font-serif text-lg font-medium text-[var(--invite-brown)] tracking-wide">
                    {event.dateLong}
                  </p>
                  <p className="font-script text-3xl text-[var(--invite-gold)] mt-1">
                    às {event.timeText}
                  </p>
                </div>

                {/* Details box */}
                <div className="px-1 pb-4 flex-1 flex flex-col justify-between">
                  <div className="text-center mb-4">
                    <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[var(--invite-gold-deep)] mb-1 font-bold">Local</p>
                    <p className="font-serif text-sm text-[var(--invite-brown)] font-semibold tracking-wide leading-snug">{event.venueName}</p>
                  </div>

                  {/* Address box with copy action */}
                  <div className="group/copy flex items-center justify-between gap-3 rounded-2xl border border-[var(--invite-line)] bg-white/40 hover:bg-white/80 px-4 py-3 transition-all duration-300 mb-4 shadow-[0_2px_8px_rgba(44,5,11,0.01)] hover:shadow-sm">
                    <p className="flex-1 font-sans text-[10.5px] leading-relaxed text-[var(--invite-brown-soft)]/90 text-center pl-3">
                      {event.venue}
                    </p>
                    <button
                      onClick={() => void handleCopyAddress(event.venue)}
                      className="text-[var(--invite-brown-soft)]/40 transition-colors hover:text-[var(--invite-gold-deep)] p-1 shrink-0"
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
              <div className="relative z-10 pt-2 flex flex-col gap-2 px-1 pb-1">
                <a
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--invite-brown)] to-[var(--invite-brown-soft)] text-white px-4 py-3 rounded-full font-sans tracking-[0.12em] text-xs font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[var(--invite-brown)]/20 active:scale-[0.98] border border-[var(--invite-gold)]/30 hover:border-[var(--invite-gold)]/60"
                  href={buildGoogleCalendarUrl({
                    title: `${event.name} — Vitória Cézar`,
                    details: `Comemoração da formatura em Direito de Vitória Cézar. Evento: ${event.name}.`,
                    location: `${event.venueName}, ${event.venue}`,
                    startsAt: event.startsAt,
                  })}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Calendar className="w-3.5 h-3.5 text-[var(--invite-gold)]" strokeWidth={2.5} />
                  SALVAR NA AGENDA
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    className="inline-flex items-center justify-center gap-1.5 bg-white/40 hover:bg-white/95 text-[var(--invite-brown)] border border-[var(--invite-gold)]/20 px-3 py-2.5 rounded-full font-sans text-[9px] font-bold uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_2px_8px_rgba(44,5,11,0.02)] hover:shadow-md hover:border-[var(--invite-gold)]/50 active:scale-[0.98]"
                    href={event.mapsUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[var(--invite-gold)]" strokeWidth={2} />
                    Google Maps
                  </a>
                  <a
                    className="inline-flex items-center justify-center gap-1.5 bg-white/40 hover:bg-white/95 text-[var(--invite-brown)] border border-[var(--invite-gold)]/20 px-3 py-2.5 rounded-full font-sans text-[9px] font-bold uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_2px_8px_rgba(44,5,11,0.02)] hover:shadow-md hover:border-[var(--invite-gold)]/50 active:scale-[0.98]"
                    href={event.wazeUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[var(--invite-gold)]" strokeWidth={2} />
                    Waze
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
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
