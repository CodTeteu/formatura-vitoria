import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, CheckCircle, Gift, Users } from "lucide-react";
import { inviteData } from "@/config/invite";

export function QuickActionsSection() {
  const navigate = useNavigate();
  const confirmationDeadlineShort = inviteData.event.confirmationDeadline.slice(0, 5);
  const giftsEnabled = inviteData.features.giftList && inviteData.giftList.enabled;

  return (
    <section className="relative z-20 px-4 pb-8 pt-16 sm:px-6 md:pb-12 md:pt-24" id="acoes-rapidas">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className={`grid items-start justify-center gap-1 sm:gap-6 ${giftsEnabled ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-3"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <button
            onClick={() => document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex min-w-0 flex-col items-center gap-3 p-2 transition-all duration-300 hover:-translate-y-1 sm:p-6"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--invite-brown)] text-[var(--invite-cream)] transition-transform duration-300 group-hover:scale-110">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="text-center">
              <h3 className="font-heading text-base sm:text-xl text-[var(--invite-brown)]">
                Família
              </h3>
              <p className="mt-1 text-[0.65rem] sm:text-xs uppercase tracking-[0.12em] text-[var(--invite-brown-soft)]">
                A base de tudo
              </p>
            </div>
          </button>

          <button
            onClick={() => document.getElementById("celebracao")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex min-w-0 flex-col items-center gap-3 p-2 transition-all duration-300 hover:-translate-y-1 sm:p-6"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--invite-brown)] text-[var(--invite-cream)] transition-transform duration-300 group-hover:scale-110">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="text-center">
              <h3 className="font-heading text-base sm:text-xl text-[var(--invite-brown)]">
                Evento
              </h3>
              <p className="mt-1 text-[0.65rem] sm:text-xs uppercase tracking-[0.12em] text-[var(--invite-brown-soft)] flex flex-col items-center">
                <span>Localização</span>
                <span>Data e Hora</span>
              </p>
            </div>
          </button>

          <button
            onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex min-w-0 flex-col items-center gap-3 p-2 transition-all duration-300 hover:-translate-y-1 sm:p-6"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--invite-brown)] text-[var(--invite-cream)] transition-transform duration-300 group-hover:scale-110">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="text-center">
              <h3 className="font-heading text-base sm:text-xl text-[var(--invite-brown)]">
                Presença
              </h3>
              <p className="mt-1 text-[0.65rem] sm:text-xs uppercase tracking-[0.12em] text-[var(--invite-brown-soft)]">
                Até {confirmationDeadlineShort}
              </p>
            </div>
          </button>

          {giftsEnabled ? (
            <button
              onClick={() => navigate("/presentes")}
              className="group flex flex-col items-center gap-3 p-4 transition-all duration-300 hover:-translate-y-1 sm:p-6"
            >
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--invite-brown)] text-[var(--invite-cream)] transition-transform duration-300 group-hover:scale-110">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-center">
                <h3 className="font-heading text-lg sm:text-xl text-[var(--invite-brown)]">
                  Presentes
                </h3>
                <p className="mt-1 text-[0.65rem] sm:text-xs uppercase tracking-[0.12em] text-[var(--invite-brown-soft)]">
                  Lista opcional
                </p>
              </div>
            </button>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
