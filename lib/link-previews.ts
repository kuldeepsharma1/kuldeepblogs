import "server-only";

import ogs from "open-graph-scraper";
import type { LinkPreviewData } from "@/components/mdx/link-preview";

const previewCache = new Map<string, Promise<LinkPreviewData | null>>();

export function getLinkPreview(href: string): Promise<LinkPreviewData | null> {
  const cached = previewCache.get(href);
  if (cached) return cached;

  const preview = fetchLinkPreview(href).then((data) => {
    if (!data) previewCache.delete(href);
    return data;
  });
  previewCache.set(href, preview);
  return preview;
}

async function fetchLinkPreview(href: string): Promise<LinkPreviewData | null> {
  try {
    const url = new URL(href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    const result = await ogs({
      url: url.toString(),
      timeout: 4,
      onlyGetOpenGraphInfo: ["title", "description", "image"],
    });

    if (result.error) return null;

    const imageUrl = result.result.ogImage?.[0]?.url;
    return {
      title: result.result.ogTitle || result.result.twitterTitle,
      description:
        result.result.ogDescription || result.result.twitterDescription,
      siteName: result.result.ogSiteName || url.hostname.replace(/^www\./, ""),
      image: imageUrl ? getSafeImageUrl(imageUrl, url) : undefined,
    };
  } catch {
    return null;
  }
}

function getSafeImageUrl(image: string, pageUrl: URL): string | undefined {
  try {
    const url = new URL(image, pageUrl);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}
