import Image from "next/image";
import { getImage, type ImageId } from "@/lib/images";

type PhotoProps = {
  id: ImageId;
  sizes: string;
  className?: string;
  alt?: string;
  /** Only the hero should set this. */
  priority?: boolean;
  position?: string;
};

/** Optimized, blur-placeholder photo that fills its (relatively positioned) parent. */
export function Photo({ id, sizes, className = "", alt, priority = false, position }: PhotoProps) {
  const m = getImage(id);
  return (
    <Image
      src={m.src}
      alt={alt ?? m.alt}
      fill
      sizes={sizes}
      quality={priority ? 60 : 75}
      placeholder="blur"
      blurDataURL={m.blur}
      preload={priority}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={`object-cover ${className}`}
      style={{ objectPosition: position ?? m.position }}
    />
  );
}
