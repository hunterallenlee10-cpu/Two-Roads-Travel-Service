import Image from "next/image";
import lockup from "@/public/brand/lockup.png";
import lockupLight from "@/public/brand/lockup-light.png";
import logo from "@/public/brand/logo.png";
import logoLight from "@/public/brand/logo-light.png";

/**
 * The Two Roads logo.
 * size "md": emblem beside "Two Roads / Travel Service" (nav, dossier).
 * size "lg": the full stacked logo with the "Your Journey. Your Way." tagline (footer).
 * tone "light" swaps the navy for sand so it reads on the dark ink background.
 */
export function Wordmark({
  tone = "dark",
  size = "md",
  className = "",
  eager = false,
}: {
  tone?: "dark" | "light";
  size?: "md" | "lg";
  className?: string;
  /** Set for logos that are visible on first paint (the nav). */
  eager?: boolean;
}) {
  const big = size === "lg";
  const src = big ? (tone === "light" ? logoLight : logo) : tone === "light" ? lockupLight : lockup;
  return (
    <Image
      src={src}
      alt="Two Roads Travel Service"
      sizes={big ? "320px" : "200px"}
      loading={eager ? "eager" : "lazy"}
      className={`${big ? "h-auto w-64 md:w-80" : "h-11 w-auto md:h-12"} select-none ${className}`}
      draggable={false}
    />
  );
}
