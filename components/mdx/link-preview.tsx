import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

export interface LinkPreviewData {
  title?: string;
  description?: string;
  siteName?: string;
  image?: string;
}

export function LinkPreview({
  href,
  children,
  preview,
}: {
  href: string;
  children: ReactNode;
  preview: LinkPreviewData | null;
}) {
  const hostname = new URL(href).hostname.replace(/^www\./, "");
  const title = preview?.title || (typeof children === "string" ? children : hostname);

  return (
    <span className="mdx-link-preview">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mdx-link-preview__card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {preview?.image ? (
            <Image
              src={preview.image}
              alt=""
              width={640}
              height={360}
              unoptimized
              className="mdx-link-preview__image"
            />
        ) : (
          <span className="mdx-link-preview__fallback">
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
        <span className="min-w-0 py-0.5">
          <span className="mdx-link-preview__site">
            {preview?.siteName || hostname}
          </span>
          <span className="mdx-link-preview__title">
            {title}
          </span>
          {preview?.description && (
            <span className="mdx-link-preview__description">
              {preview.description}
            </span>
          )}
          <span className="mdx-link-preview__host">
            {hostname}
          </span>
        </span>
      </a>
    </span>
  );
}
