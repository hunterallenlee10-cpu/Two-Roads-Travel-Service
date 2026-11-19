import { TEAM } from "@/data/team";
import { Photo } from "@/components/ui/Photo";

type TeamAvatarsProps = {
  /** Tailwind size classes for each circle. */
  size?: string;
  /** Ring color that matches the background, so the overlap reads cleanly. */
  ring?: string;
  className?: string;
};

/** Michele and Sarah as two overlapping round headshots. Decorative: nearby text names them. */
export function TeamAvatars({ size = "h-12 w-12", ring = "ring-paper", className = "" }: TeamAvatarsProps) {
  return (
    <span aria-hidden className={`flex shrink-0 -space-x-3 ${className}`}>
      {TEAM.map((a) => (
        <span key={a.key} className={`relative overflow-hidden rounded-full bg-sand-2 ring-2 ${ring} ${size}`}>
          <Photo id={a.avatar} sizes="64px" alt="" />
        </span>
      ))}
    </span>
  );
}
