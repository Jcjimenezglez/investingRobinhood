import { BRAND } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10",
} as const;

/** Pink circle isotype — favicon matches this mark. */
export function LogoMark({ size = "md", className }: LogoMarkProps) {
  return (
    <span
      role="img"
      aria-label={`${BRAND.name} logo`}
      className={cn(
        "inline-block shrink-0 rounded-full",
        sizes[size],
        className,
      )}
      style={{ backgroundColor: BRAND.color }}
    />
  );
}
