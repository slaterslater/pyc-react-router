import { useRouteLoaderData } from "react-router";
import { useNavContext } from "./NavProvider";

export function SiteList() {
  const { sites, port } = useRouteLoaderData('root')
  const { toggleNav } = useNavContext()
  const portString = port ? `:${port}` : '';
  return (
    <ul className="flex items-center gap-6 mt-auto">
      <li onClick={toggleNav}><a href={`//${sites.collective}${portString}`}><img src="/pyc-icon.png" alt="power yoga Collective" width={24} /></a></li>
      <li onClick={toggleNav}><a href={`//${sites.canada}${portString}`}><img src="/flags/CA.svg" alt="power yoga Canada" width={32} /></a></li>
      <li onClick={toggleNav}><a href={`//${sites.usa}${portString}`}><img src="/flags/US.svg" alt="power yoga USA" width={32} /></a></li>
    </ul>
  )
}