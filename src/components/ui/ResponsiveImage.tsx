import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  asset: string;
  alt: string;
  eager?: boolean;
  sizes?: string;
}

export function ResponsiveImage({
  asset,
  alt,
  className,
  eager = false,
  sizes = "100vw",
  ...props
}: ResponsiveImageProps) {
  const isGenerated = !asset.includes(".");
  const basePath = isGenerated ? `/images/generated/${asset}` : `/images/${asset}`;

  return (
    <picture>
      {isGenerated && (
        <>
          <source srcSet={`${basePath}.avif`} type="image/avif" sizes={sizes} />
          <source srcSet={`${basePath}.webp`} type="image/webp" sizes={sizes} />
        </>
      )}
      <img
        {...props}
        src={isGenerated ? `${basePath}.jpg` : basePath}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
