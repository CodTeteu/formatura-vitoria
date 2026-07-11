### Task 3: Atualizar regra `.event-card` no CSS

**Files:**
- Modify: `src/index.css:245-260` (regra `.event-card` e `.event-card:hover`)

**Interfaces:**
- Produces: regra CSS atualizada. `.event-card` agora tem `border` 1px (sem `@apply border-2`), sombra leve, `inset 0 0 0 1px #ffffff`. `.event-card:hover` tem lift `-2px` e sombra levemente mais forte. O keyline dourado interno NÃƒO vai no CSS â€” vai como div no JSX (Task 4) para flexibilidade.

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


