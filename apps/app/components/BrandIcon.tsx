/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

export interface BrandIconProps {
  className?: string;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * A modern, professional brand icon component for the Console application.
 * Features a geometric design with layered elements representing connectivity and growth.
 */
export function BrandIcon({ className = "", ariaLabel, size = "md" }: BrandIconProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel || "Console application logo"}
    >
      <title>{ariaLabel || "Console application logo"}</title>

      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.8)" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="hsl(var(--accent) / 0.7)" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="url(#brandGradient)"
        stroke="none"
      />

      {/* Inner geometric shape - stylized "C" made of segments */}
      <g transform="translate(16, 16)">
        {/* Top arc segment */}
        <path
          d="M -6,-8 A 10,10 0 0,1 6,-8"
          stroke="hsl(var(--background))"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right vertical segment */}
        <path
          d="M 6,-8 L 6,8"
          stroke="hsl(var(--background))"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Bottom arc segment */}
        <path
          d="M 6,8 A 10,10 0 0,1 -6,8"
          stroke="hsl(var(--background))"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Accent dot */}
        <circle
          cx="-8"
          cy="0"
          r="2"
          fill="url(#accentGradient)"
        />
      </g>

      {/* Subtle inner glow effect */}
      <circle
        cx="16"
        cy="16"
        r="12"
        fill="none"
        stroke="hsl(var(--background) / 0.1)"
        strokeWidth="0.5"
      />
    </svg>
  );
}