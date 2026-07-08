import { Settings, Instagram, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { inviteData } from "@/config/invite";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#3b060d] to-[#230307] py-14 text-white/80 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-5 text-center flex flex-col items-center">
        {/* Capelo Icon */}
        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
          <GraduationCap className="w-6 h-6 text-[var(--invite-gold)]" />
        </div>

        <h2 className="mb-4 font-script text-4xl text-white md:text-5xl leading-none">
          {inviteData.graduate.fullName}
        </h2>
        
        <p className="mx-auto mb-3 max-w-lg font-heading text-lg italic leading-relaxed text-white/70 md:text-xl">
          "{inviteData.graduate.signatureQuote}"
        </p>
        
        <p className="mb-6 text-[10px] uppercase tracking-[0.25em] text-[var(--invite-gold)] font-body">
          — Direito • {currentYear} —
        </p>

        <Link
          to="/admin"
          className="mb-8 inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          <Settings className="mr-2 h-3.5 w-3.5" />
          {inviteData.footer.adminLabel}
        </Link>
        
        <div className="mb-5 h-px w-full bg-white/5 max-w-xs" />
        
        <p className="mb-1 text-[8px] uppercase tracking-[0.25em] text-white/20 font-body">
          Desenvolvido com carinho por
        </p>
        <p className="mb-2 font-heading text-lg tracking-[0.3em] text-white/40 leading-none">
          LUMA
        </p>
        
        <a
          href="https://instagram.com/luma.convitesdigitais"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-white/30 hover:text-[var(--invite-gold)] transition-colors"
        >
          <Instagram className="h-3.5 w-3.5" /> @luma.convitesdigitais
        </a>
        
        <p className="mt-8 text-[9px] text-white/10 font-body">
          © {currentYear} • Formatura {inviteData.graduate.fullName} • Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
