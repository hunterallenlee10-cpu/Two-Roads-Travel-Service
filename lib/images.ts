import manifest from "@/data/images.generated.json";

export type ImageId = keyof typeof manifest;

export type ImageMeta = {
  src: string;
  avif: string;
  width: number;
  height: number;
  blur: string;
  alt: string;
  position: string;
};

export function getImage(id: ImageId): ImageMeta {
  return manifest[id] as ImageMeta;
}
