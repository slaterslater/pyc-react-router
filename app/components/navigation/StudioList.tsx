import { useRouteLoaderData } from "react-router";
import { useNavContext, type MenuGroup } from "./NavProvider";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useMemo } from "react";

export function StudioList() {
  const { studios } = useRouteLoaderData('root')
  const { openGroup } = useNavContext()

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

  const handleClick = () => {
    const studioGroup: MenuGroup = {
      id: 'studios',
      type: 'group',
      text: 'Studios',
      links: studioLinks,
    }
    openGroup(studioGroup)
  }

  return (
    <button
      className="text-md font-semibold text-cream flex justify-between items-center cursor-pointer"
      onClick={handleClick}
      aria-label="See all studios"
    >
      Studios
      <IoChevronForwardOutline size={20} />
    </button>
  )
}


type StudioLink = {
  id: string;
  name: string;
  slug: string;
}