import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { inviteData } from "@/config/invite";
import { assetPath } from "@/config/assets";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-4 pb-2 bg-gradient-to-b from-[#3b060d] to-[#1a0205] text-white/80 relative overflow-hidden font-body text-center">
      {/* Subtle overlay for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-black/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Graduate name */}
        <h2 className="font-script text-4xl md:text-5xl text-white mb-1 leading-none">
          {inviteData.graduate.fullName}
        </h2>

        {/* Course & Year */}
        <p className="font-heading text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/60 mb-1.5">
          Direito • {currentYear}
        </p>

        {/* Separator */}
        <div className="w-12 h-[1px] bg-white/20 mb-2" />

        {/* Closing quote */}
        <div className="mb-2 max-w-lg mx-auto">
          <p className="font-heading text-sm italic text-white/80 mb-1 leading-relaxed">
            "{inviteData.footer.closing}"
          </p>
        </div>

        {/* Admin button */}
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 px-5 py-1.5 border border-white/20 rounded transition-all text-[9px] uppercase tracking-[0.2em] text-white/60 hover:text-[#3b060d] hover:bg-white hover:border-white mb-3"
        >
          <Settings className="w-3 h-3" />
          {inviteData.footer.adminLabel}
        </Link>

        {/* Credits */}
        <div className="flex flex-col items-center gap-2 border-t border-white/10 pt-4 w-full max-w-sm">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-0.5">
            Site desenvolvido por
          </span>

          {/* Logo with side lines */}
          <div className="flex items-center gap-4 w-full justify-center mb-1">
            <div className="h-[1px] bg-white/15 flex-grow max-w-[60px]" />
            <img
              src={assetPath("luma-logo-v2.png")}
              alt="LUMA"
              className="h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105 transform brightness-0 invert"
            />
            <div className="h-[1px] bg-white/15 flex-grow max-w-[60px]" />
          </div>

          {/* Instagram */}
          <a
            href="https://instagram.com/luma.convitesdigitais"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-white/30 px-5 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 transform text-xs font-semibold tracking-wider mt-1"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            @luma.convitesdigitais
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5551981505838?text=Ol%C3%A1!%20Vi%20o%20site%20de%20formatura%20e%20fiquei%20interessada%20em%20saber%20mais%20sobre%20os%20convites%20digitais.%20Podem%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-white/30 px-5 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 transform text-xs font-semibold tracking-wider mt-1"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>

          <p className="text-[10px] text-white/30 mt-1 leading-relaxed">
            Quer um site assim para sua formatura? Chama a gente! ✨
          </p>
        </div>

        <p className="mt-3 text-[9px] text-white/20 font-body">
          © {currentYear} • Formatura {inviteData.graduate.fullName} • Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
