import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export async function GET(): Promise<Response> {
  const posts = await getAllPosts();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Kuldeep Blogs</title>
  <link href="https://kuldeepblogs.com" />
  <updated>${new Date(posts[0]?.publishedAt ?? new Date()).toISOString()}</updated>
  <author><name>Kuldeep</name></author>
  ${posts
    .map(
      (post) => `
  <entry>
    <title>${post.title}</title>
    <link href="https://kuldeepblogs.com/blog/${post.slug}" />
    <id>https://kuldeepblogs.com/blog/${post.slug}</id>
    <updated>${new Date(post.updatedAt ?? post.publishedAt).toISOString()}</updated>
    <summary>${post.description}</summary>
  </entry>`,
    )
    .join("")}
</feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
