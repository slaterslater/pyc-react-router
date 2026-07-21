import { Link, useRouteLoaderData } from "react-router";
import { useNavContext } from "./NavProvider";
import { useSite } from "~/hooks/useSite";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useMemo } from "react";

export function StudioList() {
  const { studios } = useRouteLoaderData('root')
  const { toggleNav, openGroup } = useNavContext()

  const studioLinks = useMemo(() => {
    return studios.map((studio: StudioLink) => ({
      id: studio.id,
      text: studio.name,
      type: 'internal',
      page: {
        slug: `/studios/${studio.slug}`,
        title: studio.name,
      },
    }))
  }, [studios])

  if (!studioLinks.length) return null;
  return (
    <>
      <button
        className="text-md font-semibold text-cream flex justify-between items-center cursor-pointer"
        onClick={() => openGroup({ text: 'Studios', links: studioLinks })}
        aria-label="See all studios"
      >
        Studios
        <IoChevronForwardOutline size={20} />
      </button>
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