### Task 2: Componente `OrnamentalDivider`

**Files:**
- Create: `src/components/ui/OrnamentalDivider.tsx`

**Interfaces:**
- Produces: `OrnamentalDivider` â€” componente React com props `{ color?: string; className?: string }`. Defaults: `color = "rgba(155, 122, 66, 0.55)"`. Renderiza um flex centralizado com: linha hairline (flex-1, gradient transparentâ†’colorâ†’transparent) + losango central (8x8px, rotacionado 45Â°, border 1px color) + linha hairline (flex-1, gradient).

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

