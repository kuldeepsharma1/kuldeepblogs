import Image from "next/image";

interface ImageFigureProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ImageFigure({ src, alt, caption }: ImageFigureProps) {
  return (
    <figure className="mdx-image-figure">
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={900}
        unoptimized={src.startsWith("http://") || src.startsWith("https://")}
        sizes="(max-width: 768px) 100vw, 768px"
        className="mdx-image-figure__image"
      />
      {caption ? (
        <figcaption className="mdx-image-figure__caption">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
