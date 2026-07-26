import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = await getAllPosts();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Kuldeep Blogs</title>
    <link>https://kuldeepblogs.com</link>
    <description>Premium writing on design, frontend engineering, and product craft.</description>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>https://kuldeepblogs.com/blog/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
