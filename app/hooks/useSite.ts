import { useRouteLoaderData } from "react-router"

export function useSite() {
  const { site, studios } = useRouteLoaderData('root')

  return {
    site,
    studios,
    hasStudios: studios.length > 0,
    logoSrc: logos[site.name as keyof typeof logos],
  }
}

const logos = {
  'Collective': '',
  'Canada': '/canada-logo.svg',
  'USA': '',
}