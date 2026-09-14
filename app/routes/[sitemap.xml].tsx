import type { LoaderFunctionArgs } from "react-router";
import { SITEMAP_QUERY } from "~/graphql/queries/sitemapQuery";
import { getSite } from "~/lib/getSite.server";
import { payload } from "~/lib/payloadClient.server";

type SitemapUrl = { loc: string; lastmod?: string };

function toLastmod(value?: string | null) {
  if (!value) return undefined;
  // sitemap accepts full ISO or YYYY-MM-DD
  return new Date(value).toISOString();
}

export async function loader({ request }: LoaderFunctionArgs) {
  const site = getSite(request);
  const origin = `https://${site.hostname}`;
  const data = await payload.request(SITEMAP_QUERY, { siteId: site.id });

  const urls: SitemapUrl[] = [
    { loc: "/" },
    { loc: "/studios" },
    { loc: "/blogs" },
    { loc: "/workshops" },
    ...(data.Pages?.docs ?? []).map((p: { slug: string; updatedAt?: string }) => ({
      loc: `/${p.slug}`,
      lastmod: toLastmod(p.updatedAt),
    })),
    ...(data.Studios?.docs ?? []).flatMap(
      (s: { slug: string; updatedAt?: string }) => {
        const lastmod = toLastmod(s.updatedAt);
        return [
          { loc: `/studios/${s.slug}`, lastmod },
          { loc: `/studios/${s.slug}/teaching-team`, lastmod },
          { loc: `/studios/${s.slug}/workshops`, lastmod },
        ];
      }
    ),
    ...(data.StudiosPages?.docs ?? [])
      .filter((p: { studio?: { slug?: string } }) => p.studio?.slug)
      .map((p: { slug: string; studio: { slug: string }; updatedAt?: string }) => ({
        loc: `/studios/${p.studio.slug}/${p.slug}`,
        lastmod: toLastmod(p.updatedAt),
      })),
    ...(data.Blogs?.docs ?? []).map((b: { slug: string; date?: string }) => ({
      loc: `/blogs/${b.slug}`,
      lastmod: toLastmod(b.date),
    })),
  ];

  // keep first occurrence if duplicates (prefer CMS lastmod over static)
  const byLoc = new Map<string, SitemapUrl>();
  for (const u of urls) {
    if (!byLoc.has(u.loc)) byLoc.set(u.loc, u);
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...byLoc.values()]
      .map(
        ({ loc, lastmod }) => `  <url>
    <loc>${escapeXml(`${origin}${loc}`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""
          }
  </url>`
      )
      .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

