# Redesign dos cards de Eventos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refrescar o visual dos cards de evento da seção "Os Eventos" do convite da Formatura Vitória, transformando a estética ornamentada pesada em "Convite Editorial / Ticket" — arejado, elegante, com hairlines douradas e refinamentos editoriais, mantendo identidade visual, carrossel e layout empilhado.

**Architecture:** Edita-se a regra `.event-card` no `index.css` (border hairline, sombra leve, hover suave) e refaz-se o JSX do card em `CelebrationSection.tsx`. Criam-se 2 componentes UI reutilizáveis pequenos (`CornerBrackets`, `OrnamentalDivider`) seguindo a convenção de `src/components/ui/`. Nenhum dado, token de cor nova, ou lógica de carrossel é tocada.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` + `@theme`/`@layer`), framer-motion, lucide-react, embla-carousel-react. Sem suite de testes — verificação via `npm run lint`, `npm run typecheck`, `npm run build`.

## Global Constraints

- **Paleta (tokens existentes em `:root`):** `--invite-brown: #2c050b`, `--invite-brown-soft: #5e101a`, `--invite-gold: #9b7a42`, `--invite-gold-deep: #785a2b`, `--invite-cream: #fffdfb`, `--invite-line: rgba(155, 122, 66, 0.22)`. Não introduzir novas cores.
- **Fontes (tokens em `@theme`):** `--font-script: "Great Vibes"`, `--font-heading: "Playfair Display"`, `--font-serif: "Cormorant Garamond"`, `--font-sans: "Manrope"`. Usar via classes `font-script`, `font-serif`, `font-heading`, `font-sans`.
- **Dourado hairline:** `rgba(189, 160, 115, 0.5)` para bordas; `rgba(155, 122, 66, 0.7)` para brackets/divisores (já alinhados aos tokens).
- **Estilo de código:** sem comentários (convenção do projeto / AGENTS.md "DO NOT ADD ANY COMMENTS"). Imports com `@/` alias. Componentes em `src/components/ui/` seguem o padrão de `Reveal.tsx` (function component, `cn` para classes).
- **Não tocar:** carrossel Embla (setas, dots, scrollSnaps, drag cue, breakpoints de padding), `quickNotes` (Manual do Convidado), `SectionHeading`, dados em `shared/invite.ts`, background blobs da seção, outras seções do convite.
- **Funcionalidades preservadas 100%:** copiar endereço (`handleCopyAddress`), salvar na agenda (`buildGoogleCalendarUrl`), Maps, Waze.
- **Verificação por task:** `npm run lint` e `npm run typecheck`. Task final roda `npm run build`.

## File Structure

- **Create:** `src/components/ui/CornerBrackets.tsx` — 4 cantos SVG em L posicionados via `absolute`. Reutilizável.
- **Create:** `src/components/ui/OrnamentalDivider.tsx` — hairline dourado + losango central. Reutilizável.
- **Modify:** `src/index.css` — regra `.event-card` e `.event-card:hover` (border hairline, sombra leve, hover suave).
- **Modify:** `src/components/sections/CelebrationSection.tsx` — refaz o JSX interno do card (imagem full-bleed + brackets, badge overlay, bloco de info com divisor, endereço minimal, botões refinados). Imports dos 2 componentes novos. Lógica do carrossel intacta.

Cada componente novo é uma unidade isolada com interface clara (`props` tipadas). `CelebrationSection.tsx` é o único consumidor no escopo, mas os componentes são genéricos o suficiente para reuso futuro.

---

### Task 1: Componente `CornerBrackets`

**Files:**
- Create: `src/components/ui/CornerBrackets.tsx`

**Interfaces:**
- Produces: `CornerBrackets` — componente React com props `{ color?: string; size?: number; strokeWidth?: number; inset?: number; className?: string }`. Defaults: `color = "rgba(155,122,66,0.7)"`, `size = 26`, `strokeWidth = 1.5`, `inset = 10`. Renderiza um container `absolute` com `inset` definido por prop, `pointer-events-none`, contendo 4 SVGs em L (top-left, top-right, bottom-left, bottom-right).

- [ ] **Step 1: Criar o arquivo `src/components/ui/CornerBrackets.tsx`**

```tsx
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface CornerBracketsProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
  inset?: number;
  className?: string;
}

export function CornerBrackets({
  color = "rgba(155, 122, 66, 0.7)",
  size = 26,
  strokeWidth = 1.5,
  inset = 10,
  className,
}: CornerBracketsProps) {
  const side = `${size}px`;
  const cornerStyle = (position: CSSProperties): CSSProperties => ({
    position: "absolute",
    width: side,
    height: side,
    ...position,
  });

  return (
    <div
      className={cn("pointer-events-none", className)}
      style={{ position: "absolute", inset: `${inset}px` }}
      aria-hidden="true"
    >
      <svg style={cornerStyle({ top: 0, left: 0 })} viewBox={`0 0 ${size} ${size}`} fill="none">
        <path d={`M ${strokeWidth} ${size / 2} V ${strokeWidth} H ${size / 2}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
      <svg style={cornerStyle({ top: 0, right: 0 })} viewBox={`0 0 ${size} ${size}`} fill="none">
        <path d={`M ${size / 2} ${strokeWidth} H ${size - strokeWidth} V ${size / 2}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
      <svg style={cornerStyle({ bottom: 0, left: 0 })} viewBox={`0 0 ${size} ${size}`} fill="none">
        <path d={`M ${strokeWidth} ${size / 2} V ${size - strokeWidth} H ${size / 2}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
      <svg style={cornerStyle({ bottom: 0, right: 0 })} viewBox={`0 0 ${size} ${size}`} fill="none">
        <path d={`M ${size / 2} ${size - strokeWidth} H ${size - strokeWidth} V ${size / 2}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint + typecheck**

Run:
```
npm run lint
npm run typecheck
```
Expected: ambos passam, sem erros em `CornerBrackets.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/CornerBrackets.tsx
git commit -m "feat(ui): add CornerBrackets component"
```

---

### Task 2: Componente `OrnamentalDivider`

**Files:**
- Create: `src/components/ui/OrnamentalDivider.tsx`

**Interfaces:**
- Produces: `OrnamentalDivider` — componente React com props `{ color?: string; className?: string }`. Defaults: `color = "rgba(155, 122, 66, 0.55)"`. Renderiza um flex centralizado com: linha hairline (flex-1, gradient transparent→color→transparent) + losango central (8x8px, rotacionado 45°, border 1px color) + linha hairline (flex-1, gradient).

- [ ] **Step 1: Criar o arquivo `src/components/ui/OrnamentalDivider.tsx`**

```tsx
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface OrnamentalDividerProps {
  color?: string;
  className?: string;
}

export function OrnamentalDivider({
  color = "rgba(155, 122, 66, 0.55)",
  className,
}: OrnamentalDividerProps) {
  const lineStyle: CSSProperties = {
    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
    height: "1px",
  };
  return (
    <div
      className={cn("flex items-center justify-center gap-3 w-full", className)}
      aria-hidden="true"
    >
      <span className="flex-1 max-w-[120px]" style={lineStyle} />
      <span
        style={{
          width: "8px",
          height: "8px",
          transform: "rotate(45deg)",
          border: `1px solid ${color}`,
        }}
      />
      <span className="flex-1 max-w-[120px]" style={lineStyle} />
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint + typecheck**

Run:
```
npm run lint
npm run typecheck
```
Expected: ambos passam, sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/OrnamentalDivider.tsx
git commit -m "feat(ui): add OrnamentalDivider component"
```

---

### Task 3: Atualizar regra `.event-card` no CSS

**Files:**
- Modify: `src/index.css:245-260` (regra `.event-card` e `.event-card:hover`)

**Interfaces:**
- Produces: regra CSS atualizada. `.event-card` agora tem `border` 1px (sem `@apply border-2`), sombra leve, `inset 0 0 0 1px #ffffff`. `.event-card:hover` tem lift `-2px` e sombra levemente mais forte. O keyline dourado interno NÃO vai no CSS — vai como div no JSX (Task 4) para flexibilidade.

- [ ] **Step 1: Substituir a regra `.event-card` em `src/index.css`**

Localizar o bloco atual (linhas 245-260):

```css
  .event-card {
    @apply rounded-[36px] border-2 transition-all duration-500;
    border-color: #bda073;
    background: linear-gradient(180deg, #ffffff 0%, #fffdfa 100%);
    box-shadow: 
      0 30px 70px rgba(44, 5, 11, 0.12), 
      inset 0 0 0 2px #ffffff;
  }

  .event-card:hover {
    border-color: #a38141;
    transform: translateY(-4px);
    box-shadow: 
      0 35px 80px rgba(44, 5, 11, 0.18), 
      inset 0 0 0 2px #ffffff;
  }
```

Substituir por:

```css
  .event-card {
    @apply rounded-[36px] border transition-all duration-500;
    border-color: rgba(189, 160, 115, 0.5);
    background: linear-gradient(180deg, #ffffff 0%, #fffdfa 100%);
    box-shadow:
      0 20px 50px rgba(44, 5, 11, 0.08),
      inset 0 0 0 1px #ffffff;
  }

  .event-card:hover {
    border-color: #a38141;
    transform: translateY(-2px);
    box-shadow:
      0 26px 60px rgba(44, 5, 11, 0.12),
      inset 0 0 0 1px #ffffff;
  }
```

- [ ] **Step 2: Rodar lint + typecheck + build**

Run:
```
npm run lint
npm run typecheck
npm run build
```
Expected: todos passam. O build processa imagens + typecheck + vite build sem erros de CSS.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style(event-card): lighter border, softer shadow, subtle hover"
```

---


### Task 4: Refazer o JSX do card em `CelebrationSection.tsx`

**Files:**
- Modify: `src/components/sections/CelebrationSection.tsx` (imports linhas 1-11 + JSX do card linhas 107-210)

**Interfaces:**
- Consumes: `CornerBrackets` (Task 1), `OrnamentalDivider` (Task 2), `.event-card` atualizada (Task 3). Mantém `ResponsiveImage`, `inviteData`, `buildGoogleCalendarUrl`, `handleCopyAddress`, `copyToClipboard`, `cn`, ícones lucide.
- Produces: card renderizado com novo visual. Sem mudança de props/export (`CelebrationSection` continua sem props).

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

No bloco do `inviteData.events.map((event) => ...)` (linhas 107-210), o container externo (linhas 108-112) é mantido:

```tsx
                <div
                  key={event.id}
                  className="min-w-0 pl-4 md:pl-6 lg:pl-8 flex-[0_0_100%] flex"
                >
```

Substituir todo o conteúdo do `.event-card` (linhas 113-208) pelo novo JSX abaixo:

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
                          às {event.timeText}
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
                            title="Copiar endereço"
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

O fechamento do `.map` (linhas 209-210) é mantido:

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
Expected: ambos passam. Atenção a: variáveis não usadas (não deve haver, pois todos os ícones importados são usados: `Shirt`, `Users`, `Camera` nos quickNotes; `Calendar`, `Check`, `Copy`, `MapPin`, `Navigation`, `Clock`, `ChevronDown`, `ChevronLeft`, `ChevronRight` no card/carrossel/accordion). Se o lint reclamar de `copyToClipboard` não usado, confirme que `handleCopyAddress` (linhas 57-67) ainda a referencia — não deve haver mudança ali.

- [ ] **Step 4: Rodar build**

Run:
```
npm run build
```
Expected: build completo sem erros.

- [ ] **Step 5: Inspeção visual manual**

Rodar `npm run dev` e verificar:
- [ ] Card tem borda hairline dourada (não a borda 2px pesada anterior)
- [ ] Imagem full-bleed com brackets dourados nos 4 cantos
- [ ] Badge do nome flutua sobre a borda imagem/info, fundo branco com borda hairline
- [ ] Divisor ornamental (linha + losango) entre data/hora e local
- [ ] Endereço sem caixa branca — só texto + hairline + botão copiar discreto
- [ ] Botão "Salvar na agenda" vinho sólido (não gradient)
- [ ] Botões Maps/Waze com border hairline (não border-2)
- [ ] Carrossel, setas, dots e drag cue funcionando
- [ ] Copiar endereço funciona (toast aparece)
- [ ] Links Maps/Waze/Agenda abrem corretamente
- [ ] Mobile e desktop visualmente ok

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/CelebrationSection.tsx
git commit -m "feat(celebration): redesign event cards — editorial ticket style"
```

---

## Self-Review (do autor do plano)

- **Spec coverage:** ✅ Casca do card (Task 3), imagem full-bleed + brackets (Task 4), badge overlay (Task 4), bloco info + divisor (Task 4: OrnamentalDivider da Task 2), endereço minimal (Task 4), botões refinados (Task 4), componentes novos (Tasks 1-2), CSS (Task 3). Fora de escopo confirmado não tocado.
- **Placeholder scan:** nenhum TBD/TODO; todos os passos têm código completo ou comandos exatos.
- **Type consistency:** `CornerBrackets` props `{color, size, strokeWidth, inset, className}` usadas na Task 4 como `<CornerBrackets inset={6} size={22} />` — consistente. `OrnamentalDivider` props `{color, className}` usada como `<OrnamentalDivider className="mt-5 mb-5" />` — consistente.
