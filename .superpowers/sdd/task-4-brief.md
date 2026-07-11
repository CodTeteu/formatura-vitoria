### Task 4: Refazer o JSX do card em `CelebrationSection.tsx`

**Files:**
- Modify: `src/components/sections/CelebrationSection.tsx` (imports linhas 1-11 + JSX do card linhas 107-210)

**Interfaces:**
- Consumes: `CornerBrackets` (Task 1), `OrnamentalDivider` (Task 2), `.event-card` atualizada (Task 3). MantÃ©m `ResponsiveImage`, `inviteData`, `buildGoogleCalendarUrl`, `handleCopyAddress`, `copyToClipboard`, `cn`, Ã­cones lucide.
- Produces: card renderizado com novo visual. Sem mudanÃ§a de props/export (`CelebrationSection` continua sem props).

- [ ] **Step 1: Atualizar imports no topo de `CelebrationSection.tsx`**

Substituir o bloco de imports atual (linhas 1-11) por:

```tsx
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, Copy, MapPin, Navigation, Shirt, Clock, ChevronDown, Users, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { inviteData } from "@/config/invite";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import { copyToClipboard } from "@/lib/format";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/cn";
```

- [ ] **Step 2: Substituir o JSX interno do card**

No bloco do `inviteData.events.map((event) => ...)` (linhas 107-210), o container externo (linhas 108-112) Ã© mantido:

```tsx
                <div
                  key={event.id}
                  className="min-w-0 pl-4 md:pl-6 lg:pl-8 flex-[0_0_100%] flex"
                >
```

Substituir todo o conteÃºdo do `.event-card` (linhas 113-208) pelo novo JSX abaixo:

```tsx
                  <div className="event-card flex flex-col justify-between w-full p-7 xs:p-8 sm:p-9 relative group overflow-hidden h-full min-h-[580px] xs:min-h-[620px] sm:min-h-[660px] md:min-h-[700px]">
                    <div className="absolute inset-2 border border-[rgba(189,160,115,0.22)] rounded-[28px] pointer-events-none" />

                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
                        <ResponsiveImage
                          asset={event.imageAsset}
                          alt={event.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          style={{ objectPosition: event.id === "festa" ? "center top" : "center center" }}
                        />
                        <CornerBrackets inset={6} size={22} />
                      </div>

                      <div className="pt-10 pb-3 px-1 text-center flex flex-col items-center relative">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 justify-center px-4 py-2 bg-[#fffdfb] rounded-full border border-[rgba(189,160,115,0.6)] shadow-[0_4px_14px_rgba(44,5,11,0.08)]">
                          <Clock className="w-3.5 h-3.5 text-[#9b7a42]" strokeWidth={2.5} />
                          <span className="font-sans text-[10px] xs:text-xs font-bold uppercase tracking-[0.25em] text-[#2c050b]">{event.name}</span>
                        </div>

                        <p className="font-serif text-xl xs:text-2xl sm:text-3xl font-extrabold text-[#2c050b] tracking-wide mt-2">
                          {event.dateLong}
                        </p>
                        <p className="font-script text-4xl xs:text-5xl sm:text-6xl text-[#9b7a42] mt-2 drop-shadow-[0_1.5px_1px_rgba(255,255,255,0.9)]">
                          Ã s {event.timeText}
                        </p>

                        <OrnamentalDivider className="mt-5 mb-5" />

                        <div className="mb-4">
                          <p className="font-sans text-[10px] xs:text-xs uppercase tracking-[0.35em] text-[#9b7a42] font-extrabold mb-1.5">Local</p>
                          <p className="font-serif text-lg xs:text-xl sm:text-2xl text-[#2c050b] font-extrabold tracking-wide leading-snug">{event.venueName}</p>
                        </div>

                        <div className="group/copy flex flex-col items-center gap-2 w-full">
                          <span className="block w-full max-w-[280px] h-px bg-gradient-to-r from-transparent via-[rgba(155,122,66,0.45)] to-transparent" />
                          <p className="font-sans text-xs xs:text-sm leading-relaxed text-[#5e101a]/90 text-center max-w-[320px]">
                            {event.venue}
                          </p>
                          <button
                            onClick={() => void handleCopyAddress(event.venue)}
                            className="inline-flex items-center gap-1.5 text-[#9b7a42] hover:text-[#2c050b] transition-colors text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer"
                            title="Copiar endereÃ§o"
                          >
                            {copyingText === event.venue ? (
                              <><Check className="size-3.5 text-[var(--invite-sage)]" strokeWidth={2.5} /> Copiado</>
                            ) : (
                              <><Copy className="size-3.5" strokeWidth={2} /> Copiar</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 pt-1 flex flex-col gap-3 px-1 pb-1">
                      <a
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#2c050b] text-[#fffdfa] px-5 py-4 rounded-full font-sans tracking-[0.2em] text-xs xs:text-sm font-bold transition-all duration-300 shadow-[0_8px_22px_rgba(44,5,11,0.18)] hover:shadow-[0_12px_30px_rgba(44,5,11,0.22)] active:scale-[0.98] border border-[#bda073] hover:brightness-110"
                        href={buildGoogleCalendarUrl({
                          title: `${event.name} â€” VitÃ³ria CÃ©zar`,
                          details: `ComemoraÃ§Ã£o da formatura em Direito de VitÃ³ria CÃ©zar. Evento: ${event.name}.`,
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
                          className="inline-flex items-center justify-center gap-1.5 bg-[#fffdfa] hover:bg-[#fffcf7] text-[#2c050b] border border-[#bda073] px-3 py-3.5 rounded-full font-sans text-[11px] xs:text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]"
                          href={event.mapsUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <MapPin className="w-4 h-4 text-[#9b7a42]" strokeWidth={2} />
                          Google Maps
                        </a>
                        <a
                          className="inline-flex items-center justify-center gap-1.5 bg-[#fffdfa] hover:bg-[#fffcf7] text-[#2c050b] border border-[#bda073] px-3 py-3.5 rounded-full font-sans text-[11px] xs:text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]"
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
```

O fechamento do `.map` (linhas 209-210) Ã© mantido:

```tsx
                </div>
              ))}
```

- [ ] **Step 3: Rodar lint + typecheck**

Run:
```
npm run lint
npm run typecheck
```
Expected: ambos passam. AtenÃ§Ã£o a: variÃ¡veis nÃ£o usadas (nÃ£o deve haver, pois todos os Ã­cones importados sÃ£o usados: `Shirt`, `Users`, `Camera` nos quickNotes; `Calendar`, `Check`, `Copy`, `MapPin`, `Navigation`, `Clock`, `ChevronDown`, `ChevronLeft`, `ChevronRight` no card/carrossel/accordion). Se o lint reclamar de `copyToClipboard` nÃ£o usado, confirme que `handleCopyAddress` (linhas 57-67) ainda a referencia â€” nÃ£o deve haver mudanÃ§a ali.

- [ ] **Step 4: Rodar build**

Run:
```
npm run build
```
Expected: build completo sem erros.

- [ ] **Step 5: InspeÃ§Ã£o visual manual**

Rodar `npm run dev` e verificar:
- [ ] Card tem borda hairline dourada (nÃ£o a borda 2px pesada anterior)
- [ ] Imagem full-bleed com brackets dourados nos 4 cantos
- [ ] Badge do nome flutua sobre a borda imagem/info, fundo branco com borda hairline
- [ ] Divisor ornamental (linha + losango) entre data/hora e local
- [ ] EndereÃ§o sem caixa branca â€” sÃ³ texto + hairline + botÃ£o copiar discreto
- [ ] BotÃ£o "Salvar na agenda" vinho sÃ³lido (nÃ£o gradient)
- [ ] BotÃµes Maps/Waze com border hairline (nÃ£o border-2)
- [ ] Carrossel, setas, dots e drag cue funcionando
- [ ] Copiar endereÃ§o funciona (toast aparece)
- [ ] Links Maps/Waze/Agenda abrem corretamente
- [ ] Mobile e desktop visualmente ok

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/CelebrationSection.tsx
git commit -m "feat(celebration): redesign event cards â€” editorial ticket style"
```

---

## Self-Review (do autor do plano)

- **Spec coverage:** âœ… Casca do card (Task 3), imagem full-bleed + brackets (Task 4), badge overlay (Task 4), bloco info + divisor (Task 4: OrnamentalDivider da Task 2), endereÃ§o minimal (Task 4), botÃµes refinados (Task 4), componentes novos (Tasks 1-2), CSS (Task 3). Fora de escopo confirmado nÃ£o tocado.
- **Placeholder scan:** nenhum TBD/TODO; todos os passos tÃªm cÃ³digo completo ou comandos exatos.
- **Type consistency:** `CornerBrackets` props `{color, size, strokeWidth, inset, className}` usadas na Task 4 como `<CornerBrackets inset={6} size={22} />` â€” consistente. `OrnamentalDivider` props `{color, className}` usada como `<OrnamentalDivider className="mt-5 mb-5" />` â€” consistente.
