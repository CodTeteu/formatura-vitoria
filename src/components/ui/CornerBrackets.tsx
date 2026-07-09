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
