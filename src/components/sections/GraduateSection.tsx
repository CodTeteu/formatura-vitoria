import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { inviteData } from "@/config/invite";

export function GraduateSection() {
  return (
    <section id="graduate" className="w-full pt-16 pb-12 md:py-24 relative z-10 max-w-[800px] mx-auto px-5 md:px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <p className="font-body text-[var(--invite-gold)] uppercase tracking-[0.3em] text-xs font-semibold mb-4">
          A Formanda
        </p>
        <h2 className="font-script text-5xl md:text-7xl text-[var(--invite-brown)] mb-8">
          {inviteData.hero.name}
        </h2>

        <div className="prose prose-base md:prose-lg text-[var(--invite-brown-soft)]/90 mb-12 font-body leading-relaxed max-w-2xl mx-auto">
          <p className="text-lg md:text-xl">
            Após anos de dedicação, desafios superados e constante aprendizado, tenho a imensa alegria de celebrar minha graduação em Direito. Esta conquista é o fruto de muito esforço, fé e o apoio inestimável daqueles que estiveram ao meu lado. É com grande carinho que convido você para compartilhar comigo este momento único da minha vida.
          </p>
          <p className="mt-5 font-heading font-bold text-[var(--invite-brown)] text-xl tracking-wider">
            {inviteData.hero.name}
          </p>
        </div>

        {/* Quote */}
        {inviteData.graduate.signatureQuote && (
          <div className="relative mb-12 py-6 px-8 max-w-xl text-center bg-[var(--invite-sage-soft)]/20 border border-[var(--invite-line)] rounded-2xl mx-auto shadow-sm">
            <Quote className="absolute top-0 left-1/2 w-8 h-8 text-[var(--invite-gold)] -translate-x-1/2 -translate-y-1/2 fill-white p-1.5 rounded-full border border-[var(--invite-line)] bg-white" />
            <p className="font-heading italic text-lg md:text-2xl text-[var(--invite-brown)] leading-relaxed">
              "{inviteData.graduate.signatureQuote}"
            </p>
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[var(--invite-line)] max-w-md mx-auto">
          <div className="text-center border-r border-[var(--invite-line)] pr-6">
            <span className="block text-xs uppercase text-[var(--invite-brown)]/60 tracking-wider mb-2 font-body">Curso</span>
            <span className="font-heading text-xl md:text-2xl text-[var(--invite-brown)] font-bold tracking-wide">
              {inviteData.graduate.course}
            </span>
          </div>
          <div className="text-center pl-6">
            <span className="block text-xs uppercase text-[var(--invite-brown)]/60 tracking-wider mb-2 font-body">Universidade</span>
            <span className="font-heading text-xl md:text-2xl text-[var(--invite-brown)] font-bold tracking-wide">
              PUC Goiás
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
