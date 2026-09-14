import type { LoaderFunctionArgs } from "react-router";
import { getSite } from "~/lib/getSite.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const site = getSite(request);
  const origin = `https://${site.hostname}`;

  // Always output robots.txt in canonical format with blank lines normalized
  const lines = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    ""
  ];

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}