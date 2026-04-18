import { useState } from "react";
import { Calendar, Clock3, Copy, MapPin, Shirt, Users } from "lucide-react";
import { toast } from "sonner";
import { inviteData } from "@/config/invite";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import { copyToClipboard } from "@/lib/format";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const essentials = [
  {
    icon: Clock3,
    label: "Chegue no horário",
    value: "Início às 22:22.",
  },
  {
    icon: Shirt,
    label: "Traje",
    value: inviteData.event.dressCode,
  },
  {
    icon: Users,
    label: "Confirmação",
    value: `Até ${inviteData.event.confirmationDeadline}.`,
  },
] as const;

export function CelebrationSection() {
  const [copying, setCopying] = useState(false);

  async function handleCopyAddress() {
    try {
      setCopying(true);
      await copyToClipboard(inviteData.event.venue);
      toast.success("Endereço copiado com sucesso.");
    } catch {
      toast.error("Não foi possível copiar o endereço.");
    } finally {
      setCopying(false);
    }
  }

  return (
    <section className="invite-section !pt-4 sm:!pt-8" id="celebracao">
      <div className="invite-container">
        <SectionHeading
          align="center"
          label={inviteData.celebration.label}
          title={inviteData.celebration.title}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="invite-card-strong overflow-hidden">
            <div className="relative h-[240px] overflow-hidden sm:h-[280px]">
              <ResponsiveImage
                asset={inviteData.celebration.primaryImageAsset}
                alt="Camilla em retrato de celebração"
                className="h-full w-full object-cover object-[center_25%]"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
              <div className="absolute inset-x-0 top-0 px-6 pt-8 text-center">
                <p className="font-heading text-lg uppercase tracking-[0.4em] text-[var(--invite-emerald)]">
                  Data e hora
                </p>
              </div>

            </div>

            <div className="space-y-5 px-6 py-6 sm:px-7">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-body text-xl text-[var(--invite-brown-soft)] sm:text-2xl">
                  Data: 18 de julho de 2026
                </p>
                <p className="font-body text-xl text-[var(--invite-brown-soft)] sm:text-2xl">
                  Horário: 22:00
                </p>
              </div>

              <div className="flex justify-center sm:justify-start">
                <a
                  className="invite-button-secondary"
                  href={buildGoogleCalendarUrl()}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Calendar className="mr-2 size-4" />
                  Salvar na agenda
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="invite-card-strong px-6 py-6 sm:px-7" delay={0.08}>
            <div className="space-y-5 text-center sm:text-left">
              <div className="space-y-2">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--invite-sage)]">
                  Local
                </p>
                <h3 className="font-heading text-3xl text-[var(--invite-brown)]">
                  {inviteData.event.venueName}
                </h3>
              </div>

              <div className="rounded-[24px] border border-[var(--invite-line)] bg-[var(--invite-sage-soft)]/40 px-5 py-5">
                <p className="font-body text-xl leading-relaxed text-[var(--invite-brown-soft)] sm:text-2xl">
                  {inviteData.event.venue}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                <a
                  className="invite-button-secondary"
                  href={inviteData.event.mapsUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MapPin className="mr-2 size-4" />
                  Abrir no Maps
                </a>
                <button
                  className="invite-button-secondary"
                  onClick={() => void handleCopyAddress()}
                  type="button"
                >
                  <Copy className="mr-2 size-4" />
                  {copying ? "Copiando..." : "Copiar endereço"}
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {essentials.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal
                className="invite-card px-5 py-5 text-center md:text-left"
                delay={0.08 + index * 0.05}
                key={item.label}
              >
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[var(--invite-sage-soft)] text-[var(--invite-brown)]">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </div>
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--invite-sage)]">
                    {item.label}
                  </p>
                </div>
                <p className="mt-4 font-body text-xl text-[var(--invite-brown-soft)] sm:text-2xl">
                  {item.value}
                </p>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
