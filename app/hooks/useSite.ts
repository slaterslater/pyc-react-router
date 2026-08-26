import { useRouteLoaderData } from "react-router"

export function useSite() {
  const { site, studios } = useRouteLoaderData('root')

  return {
    site,
    siteName: site.name,
    studios,
    hasStudios: studios.length > 0,
    logoSrc: logos[site.name as keyof typeof logos],
  }
}

const logos = {
  'Collective': '/collective-logo.png',
  'Canada': '/canada-logo.svg',
  'USA': null,
}