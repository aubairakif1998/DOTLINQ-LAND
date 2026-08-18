import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";

type BrandLogoProps = {
  collapsed?: boolean;
  /** Optional extra line under the logo (logo asset already includes tagline). */
  subtitle?: string;
  className?: string;
  /** Kept for call-site compatibility; both variants use your uploaded assets. */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
};

/** Short mark — square asset, cropped tight. */
const MARK_SIZE = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
  lg: "h-12 w-12",
} as const;

/**
 * Full wordmark (~3:1). Transparent PNG — blends with page mesh.
 * Height drives scale; width follows.
 */
const LOGO_HEIGHT = {
  sm: "h-9",
  md: "h-11",
  lg: "h-14",
} as const;

const LOGO_MAX_WIDTH = {
  sm: "max-w-[12rem]",
  md: "max-w-[15rem]",
  lg: "max-w-[18rem]",
} as const;

/** Short logo (uploaded Q mark) — favicon / collapsed sidebar. */
export function DotMark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <img
      src={BRAND.assets.mark}
      alt=""
      className={cn(
        "shrink-0 object-contain object-center",
        MARK_SIZE[size],
        className,
      )}
      draggable={false}
    />
  );
}

/**
 * DotLinQ brand logo — uses only uploaded assets from /public/brand.
 * - collapsed → short mark (dotlinq-mark.png)
 * - expanded → complete logo (dotlinq-logo.png)
 */
export function BrandLogo({
  collapsed = false,
  subtitle,
  className,
  size = "md",
}: BrandLogoProps) {
  if (collapsed) {
    return (
      <img
        src={BRAND.assets.mark}
        alt={BRAND.name}
        className={cn(
          "shrink-0 object-contain object-center",
          MARK_SIZE[size],
          className,
        )}
        draggable={false}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-start justify-center",
        className,
      )}
    >
      <img
        src={BRAND.assets.logo}
        alt={BRAND.name}
        className={cn(
          "block w-auto bg-transparent object-contain object-left",
          LOGO_HEIGHT[size],
          LOGO_MAX_WIDTH[size],
        )}
        draggable={false}
      />
      {subtitle ? (
        <p className="mt-1 truncate text-[11px] leading-none text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
