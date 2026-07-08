import { motion } from "framer-motion";

export function DinnerSection() {
  return (
    <section id="cardapio" className="pt-12 pb-10 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/[0.02] pointer-events-none z-10" />

      <div className="container mx-auto px-5 md:px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <p className="font-body text-[var(--invite-gold)] uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Cardápio
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-[var(--invite-brown)] mb-4">
            Opções do Buffet
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--invite-gold)] to-transparent mx-auto" />
        </div>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Vintage Parchment Styled Card using pure CSS gradients */}
            <div
              className="relative p-6 md:p-12 shadow-2xl transition-transform duration-500 will-change-transform rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #fdfcf7 0%, #faf8f0 100%)",
                boxShadow: "0 25px 50px -12px rgba(44, 5, 11, 0.12)"
              }}
            >
              <div className="border border-[var(--invite-gold)]/30 rounded-lg h-full p-5 md:p-8 flex flex-col items-center text-center">
                <p className="font-heading text-[var(--invite-gold)] tracking-widest text-xs uppercase mb-2">Cardápio Especial</p>
                <h3 className="font-script text-3xl md:text-5xl mb-4 text-[var(--invite-brown)]">Buffet da Festa</h3>

                <div className="w-16 h-0.5 bg-[var(--invite-gold)]/40 mb-8" />

                <div className="space-y-7 w-full max-w-sm text-center">
                  {/* Entradas */}
                  <div>
                    <h4 className="font-heading text-lg font-bold text-[var(--invite-brown)] mb-2 uppercase tracking-wide">Entradas & Salgados</h4>
                    <p className="font-body text-slate-700 italic text-sm leading-relaxed">
                      Salgados finos fritos e assados (coxinha gourmet, quibes recheados, risoles de queijo), tábua de frios nobres e mini-canapés variados.
                    </p>
                  </div>

                  {/* Prato Principal */}
                  <div>
                    <h4 className="font-heading text-lg font-bold text-[var(--invite-brown)] mb-2 uppercase tracking-wide">Pratos Principais</h4>
                    <p className="font-body text-slate-700 italic text-sm leading-relaxed">
                      Massas artesanais ao molho quatro queijos e pomodoro fresco, carnes nobres grelhadas com guarnições especiais e arroz de festa.
                    </p>
                  </div>

                  {/* Bebidas */}
                  <div>
                    <h4 className="font-heading text-lg font-bold text-[var(--invite-brown)] mb-2 uppercase tracking-wide">Bebidas Inclusas</h4>
                    <p className="font-body text-slate-700 italic text-sm leading-relaxed">
                      Sucos naturais de frutas da estação, refrigerantes de marcas selecionadas, água mineral com e sem gás.
                    </p>
                  </div>

                  {/* Sobremesas */}
                  <div>
                    <h4 className="font-heading text-lg font-bold text-[var(--invite-brown)] mb-2 uppercase tracking-wide">Sobremesas</h4>
                    <p className="font-body text-slate-700 italic text-sm leading-relaxed">
                      Mesa de doces finos decorados, torta festiva e bolo servido com sorvete de creme.
                    </p>
                  </div>
                </div>

                <div className="w-16 h-px bg-[var(--invite-gold)]/20 mt-8 mb-4" />
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">
                  Confirmação de presença obrigatória.<br />
                  Crianças de até 5 anos são isentas.
                </p>
              </div>

              {/* Ornate Vintage Corners */}
              <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-[var(--invite-gold)]/40 rounded-tl-sm" />
              <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-[var(--invite-gold)]/40 rounded-tr-sm" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-[var(--invite-gold)]/40 rounded-bl-sm" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-[var(--invite-gold)]/40 rounded-br-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
