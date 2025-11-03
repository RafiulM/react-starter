import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva(
  "scroll-m-20 tracking-tight",
  {
    variants: {
      level: {
        h1: "text-4xl lg:text-5xl font-bold",
        h2: "text-3xl font-semibold",
        h3: "text-2xl font-semibold",
        h4: "text-xl font-semibold",
        h5: "text-lg font-semibold",
        h6: "text-base font-semibold",
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent-foreground",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      level: "h2",
      color: "default",
      align: "left",
      weight: "semibold",
    },
  },
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, color, align, weight, as, ...props }, ref) => {
    // Determine the semantic HTML element based on level or explicit as prop
    const Component = as || level || "h2";

    // Ensure we don't use invalid heading levels
    const validLevel = level || "h2";

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level: validLevel, color, align, weight, className }))}
        {...props}
      />
    );
  },
);

Heading.displayName = "Heading";

// Export individual heading components for convenience
export const H1 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading ref={ref} level="h1" {...props} />,
);

H1.displayName = "H1";

export const H2 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading ref={ref} level="h2" {...props} />,
);

H2.displayName = "H2";

export const H3 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading ref={ref} level="h3" {...props} />,
);

H3.displayName = "H3";

export const H4 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading ref={ref} level="h4" {...props} />,
);

H4.displayName = "H4";

export const H5 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading ref={ref} level="h5" {...props} />,
);

H5.displayName = "H5";

export const H6 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading ref={ref} level="h6" {...props} />,
);

H6.displayName = "H6";

export { Heading, headingVariants };