### Task 1: Componente `CornerBrackets`

**Files:**
- Create: `src/components/ui/CornerBrackets.tsx`

**Interfaces:**
- Produces: `CornerBrackets` â€” componente React com props `{ color?: string; size?: number; strokeWidth?: number; inset?: number; className?: string }`. Defaults: `color = "rgba(155,122,66,0.7)"`, `size = 26`, `strokeWidth = 1.5`, `inset = 10`. Renderiza um container `absolute` com `inset` definido por prop, `pointer-events-none`, contendo 4 SVGs em L (top-left, top-right, bottom-left, bottom-right).

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

