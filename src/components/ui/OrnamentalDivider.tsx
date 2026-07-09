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
