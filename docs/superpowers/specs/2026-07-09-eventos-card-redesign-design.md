# Redesign dos cards da seção Eventos — Formatura Vitória

**Data:** 2026-07-09
**Arquivo alvo:** `src/components/sections/CelebrationSection.tsx`
**CSS alvo:** `src/index.css` (classe `.event-card`)
**Escopo:** refresh visual dos cards de evento, mantendo carrossel Embla, layout empilhado (imagem em cima, info embaixo) e a identidade visual do convite (vinho + dourado + creme; fontes script/serif/sans).

## Contexto

A seção "Os Eventos" (`CelebrationSection.tsx`, âncora `#celebracao`) exibe 3 eventos (Missa, Colação, Festa) num carrossel Embla (1 card por vez). Cada card usa a classe `.event-card` e hoje tem uma estética ornamentada pesada: moldura dourada dupla (border 2px + inner border inset-3.5), badge em gradient vinho, caixa de endereço com borda, botões com gradient e sombras fortes.

O usuário pediu um **refresh visual sem problema específico**, mantendo a identidade e a estrutura (carrossel + empilhamento). Direção escolhida: **"Convite Editorial / Ticket"** — feel de convite impresso de luxo, mais arejado e elegante, substituindo o peso ornamental por refinamentos editoriais.

## Objetivos

- Refrescar o visual dos cards sem romper com a identidade
- Sensação de convite impresso de luxo (em vez de card ornamentado)
- Mais whitespace, sombras leves, hairlines douradas
- Preservar 100% das funcionalidades (copiar endereço, salvar na agenda, Maps, Waze, carrossel, dots, setas, drag cue)

## Fora de escopo

- Carrossel Embla (setas, dots, scrollSnaps, drag cue helper)
- `quickNotes` (Manual do Convidado) — grid desktop + acordeão mobile abaixo do carrossel
- `SectionHeading` "Os Eventos"
- Dados em `shared/invite.ts`
- Outras seções do convite

## Design detalhado

### 1. Casca do card (`.event-card`)

| Propriedade | Atual | Novo |
|---|---|---|
| Border | `2px` sólido `#bda073` | hairline `1px` `rgba(189,160,115,0.5)` |
| Moldura interna | border inset-3.5 2px `#bda073/40` | removida; substituída por keyline hairline discreto `inset-2 1px rgba(189,160,115,0.22)` |
| Rounded | 36px | mantém |
| Background | gradient `#ffffff → #fffdfa` | mantém |
| Sombra | `0 30px 70px rgba(44,5,11,0.12)` + inset branco | `0 20px 50px rgba(44,5,11,0.08)` + inset branco |
| Hover lift | `-4px` | `-2px` |
| Hover sombra | `0 35px 80px ...0.18` | `0 26px 60px rgba(44,5,11,0.12)` |
| Hover border | `#a38141` | mantém |
| Padding | `p-6 xs:p-8 sm:p-10` | `p-7 sm:p-9` (ligeiramente maior para respirar) |
| min-height | `580/620/660/700px` | mantém |

### 2. Imagem (topo full-bleed)

- **Full-bleed:** a imagem toca as bordas do card (sem `rounded-2xl` interno). O `overflow-hidden` do card cuida do clipping pelo rounded-36px.
- **Aspect:** 16/10 (mantém).
- **Border dourado 2px ao redor:** removido (o card já tem hairline).
- **Brackets dourados (novo):** 4 cantos em L, SVG inline, `stroke 1.5px` cor `rgba(155,122,66,0.7)`, tamanho ~26px, posicionados `absolute inset-2.5` (ou similar). Componente reutilizável `<CornerBrackets />`.
- **Hover scale:** mantém `group-hover:scale-[1.03]` suave.
- **sombra:** removida a `shadow-md` da imagem (o card fornece a sombra).

### 3. Badge do nome (overlay na borda imagem/info)

- **Posição:** `absolute left-1/2 top-[...imagem-bottom] -translate-x-1/2 -translate-y-1/2` — flutua na linha de transição imagem→info (efeito editorial clássico).
- **Estilo:**
  - Fundo: branco papel `#fffdfb` (em vez de gradient vinho).
  - Border: hairline dourado `1px rgba(189,160,115,0.6)`.
  - Texto: vinho `#2c050b`, uppercase, tracking `[0.25em]`, `text-[10px] xs:text-xs` font-bold.
  - Clock icon: dourado `#9b7a42`, `w-3.5 h-3.5` (menor que o atual `w-4 h-4`).
  - Sombra: leve `0 4px 14px rgba(44,5,11,0.08)`.
- **Resultado:** selo de convite flutuando, não pílula vinho pesada.

### 4. Bloco de info

- **Padding-top:** maior para acomodar o badge overlay (`pt-10` aprox., ajustar visualmente).
- **Data:** `font-serif text-xl xs:text-2xl sm:text-3xl font-extrabold text-[#2c050b]` (mantém).
- **Hora:** `font-script text-4xl xs:text-5xl sm:text-6xl text-[#9b7a42]` (mantém — assinatura da identidade).
- **Divisor ornamental (novo):** hairline dourado horizontal com pequeno losango central, entre o bloco data/hora e o bloco local. Componente `<OrnamentalDivider />` (SVG ou div + losango rotacionado). Cor `rgba(155,122,66,0.55)`.
- **"Local" label:** uppercase tracking dourado (mantém).
- **venueName:** serif vinho (mantém).
- **Endereço:** minimal — remove a caixa branca com borda e o botão copiar grande. Vira bloco de texto centralizado com hairline dourado acima (linear-gradient transparent→dourado→transparent) + botão copiar discreto (só ícone dourado, label "Copiar" revela no hover via tooltip/title).

### 5. Botões de ação

- **Salvar na agenda:**
  - Fundo: vinho sólido `#2c050b` (não gradient pesado).
  - Border: dourado hairline `1px #bda073`.
  - Texto: branco creme `#fffdfa`, tracking refinado `[0.2em]`, font-bold.
  - Padding: generoso `px-5 py-4`.
  - Sombra: leve `0 8px 22px rgba(44,5,11,0.18)`.
  - Hover: `brightness-110` + sombra levemente mais forte (sem translate exagerado).
- **Maps + Waze (grid 2 col):**
  - Fundo: creme/transparente `#fffdfa`.
  - Border: dourado hairline `1px #bda073`.
  - Texto: vinho `#2c050b`, uppercase, tracking `[0.15em]`, font-bold.
  - Icons: dourado `#9b7a42`.
  - Hover: `bg-[#fffcf7]` + sombra leve, **sem** `-translate-y-0.5` (ou `-translate-y-0.5` muito sutil).

### 6. Componentes novos (reutilizáveis)

- `<CornerBrackets />` — 4 SVGs em L posicionados via `absolute`. Props opcionais: `color`, `size`, `strokeWidth`, `inset`.
- `<OrnamentalDivider />` — linha hairline + losango central. Props opcionais: `color`, `className`.

Local: `src/components/ui/` (seguindo convenção existente do projeto).

### 7. CSS (`.event-card` no `index.css`)

Atualizar apenas a regra `.event-card` e `.event-card:hover`:

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

(Nota: a moldura interna `inset 0 0 0 1px #ffffff` vira hairline branco sutil para profundidade; o keyline dourado interno é aplicado no JSX como div `absolute inset-2 border border-[rgba(189,160,115,0.22)]`.)

### 8. Fora de escopo (não muda)

- Carrossel Embla (setas, dots, scrollSnaps, drag cue, breakpoints de padding `-ml-4 md:-ml-6 lg:-ml-8`)
- `quickNotes` (Manual do Convidado) — grid desktop + acordeão mobile
- `SectionHeading` "Os Eventos"
- Dados em `shared/invite.ts`
- Outras seções do convite
- Background blobs da seção (`.opacity-[0.03]` blobs dourado/vinho)

## Verificação

- `npm run lint` (eslint.config.js presente)
- `npm run typecheck` se disponível em `package.json` scripts
- `npm run build` para confirmar que nada quebrou
- Inspeção visual manual (dev server) comparando mobile/desktop
