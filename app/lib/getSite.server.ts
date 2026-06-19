export function getSite(url: URL): SiteConfig {

  // Very important that the IDs match payload
  const SITES = {
    [process.env.HOSTNAME_COLLECTIVE!]: { id: 1, name: "Collective" },
    [process.env.HOSTNAME_CANADA!]: { id: 2, name: "Canada" },
    [process.env.HOSTNAME_USA!]: { id: 3, name: "USA" },
  } as const;

  const site = SITES[url.hostname];

  if (!site) {
    throw new Error(`Invalid hostname: ${url.hostname}`);
  }

  return site;
}

export type SiteName = "Collective" | "Canada" | "USA";

interface SiteConfig {
  id: number;
  name: SiteName;
}