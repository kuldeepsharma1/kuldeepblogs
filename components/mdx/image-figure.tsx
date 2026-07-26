import Image from "next/image";

interface ImageFigureProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ImageFigure({ src, alt, caption }: ImageFigureProps) {
  return (
    <figure className="mt-10 overflow-hidden rounded-4xl border border-zinc-200/80 bg-white/80 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
      <Image src={src} alt={alt} width={1400} height={900} className="h-auto w-full object-cover" />
      {caption ? <figcaption className="px-5 py-4 text-sm text-zinc-500 dark:text-zinc-400">{caption}</figcaption> : null}
    </figure>
  );
}
