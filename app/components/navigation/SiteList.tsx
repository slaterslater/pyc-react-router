import { useRouteLoaderData } from "react-router";
import { useNavContext } from "./NavProvider";

export function SiteList() {
  const { sites, port } = useRouteLoaderData('root')
  const { closeNav } = useNavContext()
  const portString = port ? `:${port}` : '';
  return (
    <ul className="flex items-center gap-8 md:gap-12 mt-auto mx-auto">
      <li onClick={closeNav}><a href={`//${sites.collective}${portString}`}><img src="/pyc-icon.png" alt="power yoga Collective" width={24} className="rounded-xs" /></a></li>
      <li onClick={closeNav}><a href={`//${sites.canada}${portString}`}><img src="/flags/CA.svg" alt="power yoga Canada" width={32} className="rounded-xs" /></a></li>
      <li onClick={closeNav}><a href={`//${sites.usa}${portString}`}><img src="/flags/US.svg" alt="power yoga USA" width={32} className="rounded-xs" /></a></li>
    </ul>
  )
}