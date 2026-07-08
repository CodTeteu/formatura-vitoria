import { useState } from "react";
import { Calendar, Check, Copy, MapPin, Navigation, Shirt, Clock } from "lucide-react";
import { toast } from "sonner";
import { inviteData } from "@/config/invite";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import { copyToClipboard } from "@/lib/format";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CelebrationSection() {
  const [copyingText, setCopyingText] = useState<string | null>(null);

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
              className="bg-white rounded-[32px] shadow-xl border border-[var(--invite-line)]/40 flex flex-col justify-between w-full p-4 md:p-5 relative group overflow-hidden"
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
                  />
                </div>

                {/* Event Info Header */}
                <div className="pt-5 pb-3 px-1 text-center">
                  <div className="inline-flex items-center gap-1.5 justify-center mb-2.5 px-3 py-1 bg-[var(--invite-sage-soft)] text-[var(--invite-brown)] rounded-full border border-[var(--invite-line)]/30">
                    <Clock className="w-3.5 h-3.5 text-[var(--invite-sage)]" />
                    <span className="font-heading text-[9px] uppercase tracking-[0.2em] font-bold">{event.name}</span>
                  </div>
                  <p className="font-heading text-lg font-semibold text-[var(--invite-brown)] tracking-wide">
                    {event.dateLong}
                  </p>
                  <p className="font-script italic text-2xl text-[var(--invite-gold-deep)] mt-0.5">
                    às {event.timeText}
                  </p>
                </div>

                {/* Details box */}
                <div className="px-1 pb-4 flex-1 flex flex-col justify-between">
                  <div className="text-center mb-4">
                    <p className="font-heading text-[9px] uppercase tracking-[0.25em] text-[var(--invite-gold-deep)] mb-1">Local</p>
                    <p className="font-sans text-xs text-[var(--invite-brown)] font-bold">{event.venueName}</p>
                  </div>

                  {/* Address box with copy action */}
                  <div className="group/copy relative rounded-xl border border-[var(--invite-gold)]/15 bg-[var(--invite-cream)] px-4 py-3.5 transition-all duration-300 hover:bg-[#fffbfb] mb-4">
                    <p className="pr-6 font-sans text-[11px] leading-relaxed text-[var(--invite-brown-soft)] text-center">
                      {event.venue}
                    </p>
                    <button
                      onClick={() => void handleCopyAddress(event.venue)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--invite-brown-soft)]/40 transition-colors hover:text-[var(--invite-brown)]"
                      title="Copiar endereço"
                    >
                      {copyingText === event.venue ? (
                        <Check className="size-3.5 text-[var(--invite-sage)]" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Traje row */}
                  <div className="flex items-start gap-2.5 px-3 py-3 rounded-xl bg-[var(--invite-sage-soft)]/20 border border-[var(--invite-line)]/10">
                    <Shirt className="w-4 h-4 text-[var(--invite-sage)] shrink-0 mt-0.5" />
                    <div className="text-[11px] leading-relaxed text-[var(--invite-brown-soft)]">
                      <span className="font-semibold text-[var(--invite-brown)] uppercase tracking-wider text-[9px]">Traje: </span>
                      {event.dressCode}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 pt-2 flex flex-col gap-2 px-1 pb-1">
                <a
                  className="w-full inline-flex items-center justify-center gap-2 bg-[var(--invite-brown)] hover:bg-[var(--invite-brown-soft)] text-white px-4 py-3 rounded-full font-heading tracking-widest text-xs transition-colors duration-300 shadow-sm"
                  href={buildGoogleCalendarUrl({
                    title: `${event.name} — Vitória Cézar`,
                    details: `Comemoração da formatura em Direito de Vitória Cézar. Evento: ${event.name}.`,
                    location: `${event.venueName}, ${event.venue}`,
                    startsAt: event.startsAt,
                  })}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Salvar na Agenda
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    className="inline-flex items-center justify-center gap-1.5 bg-[var(--invite-cream)] hover:bg-[var(--invite-sage-soft)]/30 text-[var(--invite-brown)] border border-[var(--invite-line)]/50 px-3 py-2.5 rounded-full font-sans text-[10px] font-semibold transition-all duration-300"
                    href={event.mapsUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <MapPin className="w-3 h-3 text-[var(--invite-gold)]" />
                    Google Maps
                  </a>
                  <a
                    className="inline-flex items-center justify-center gap-1.5 bg-[var(--invite-cream)] hover:bg-[var(--invite-sage-soft)]/30 text-[var(--invite-brown)] border border-[var(--invite-line)]/50 px-3 py-2.5 rounded-full font-sans text-[10px] font-semibold transition-all duration-300"
                    href={event.wazeUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Navigation className="w-3 h-3 text-[var(--invite-gold)]" />
                    Waze
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quick notes manual */}
        {inviteData.celebration.quickNotes.length > 0 && (
          <div className="mt-14 p-6 sm:p-8 rounded-[30px] border border-[var(--invite-line)]/40 bg-white/70 backdrop-blur-md shadow-sm">
            <h4 className="font-heading text-lg text-[var(--invite-brown)] mb-4 text-center sm:text-left tracking-wide">
              Informações Importantes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {inviteData.celebration.quickNotes.map((note, index) => (
                <div key={index} className="space-y-1.5">
                  <h5 className="font-heading text-sm text-[var(--invite-gold-deep)] font-semibold uppercase tracking-wider">
                    {note.title}
                  </h5>
                  <p className="font-sans text-xs text-[var(--invite-brown-soft)] leading-relaxed">
                    {note.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
