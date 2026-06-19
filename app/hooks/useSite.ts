import { useRouteLoaderData } from "react-router"

export function useSite() {
  const { site, studios } = useRouteLoaderData('root')
  return {
    site,
    studios,
    hasStudios: studios.length > 0
  }
}