import React from "react";

interface AxaLogoProps {
  className?: string;
  variant?: "primary" | "white";
}

/**
 * Official Instalaciones AXA brand identity.
 * Respects original proportions, typography, and official primary blue (#0B116B).
 * Never stretches or distorts.
 */
export const AxaLogo: React.FC<AxaLogoProps> = ({
  className = "h-9 w-auto",
  variant = "primary",
}) => {
  const brandColor = variant === "white" ? "#FFFFFF" : "#0B116B";
  const subColor = variant === "white" ? "#E0E3F5" : "#4A5073";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon Mark */}
      <svg
        className="h-full w-auto aspect-square shrink-0"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Geometric AXA hexagon / triad emblem representing Climatización, Electricidad, Fontanería */}
        <rect
          x="2"
          y="2"
          width="40"
          height="40"
          rx="10"
          fill={variant === "white" ? "rgba(255,255,255,0.12)" : "#F2F4FF"}
          stroke={brandColor}
          strokeWidth="2.5"
        />
        {/* Monogram A-X-A geometric technical intersection */}
        <path
          d="M13 31L22 13L31 31"
          stroke={brandColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 25H27.5"
          stroke={brandColor}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Central precision vertex */}
        <circle cx="22" cy="19.5" r="2.2" fill={brandColor} />
      </svg>

      {/* Brand Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className="text-[10px] font-bold tracking-[0.22em] uppercase transition-colors"
          style={{ color: subColor }}
        >
          Instalaciones
        </span>
        <span
          className="text-xl sm:text-2xl font-extrabold tracking-tight"
          style={{ color: brandColor, letterSpacing: "-0.03em" }}
        >
          AXA
        </span>
      </div>
    </div>
  );
};
