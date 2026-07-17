import { Link, useRouteLoaderData } from "react-router";
import { useNavContext } from "./NavProvider";
import { useSite } from "~/hooks/useSite";

export function StudioList() {
  const { studios } = useRouteLoaderData('root')
  const { toggleNav } = useNavContext()
  const { hasStudios } = useSite()

  if (!hasStudios) return null;
  return (
    <>
      <div className="text-md font-semibold text-cream">Studios</div>
      {/* <ul className="text-cream">
        {studios.map((studio: StudioLink) => (
          <li key={studio.id} onClick={toggleNav}>
            <Link to={`/studios/${studio.slug}`}>{studio.name}</Link>
          </li>
        ))}
      </ul> */}
    </>
  )
}


type StudioLink = {
  id: string;
  name: string;
  slug: string;
}