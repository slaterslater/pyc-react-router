import { useNavContext, type MenuGroup } from "./NavProvider"
import { StudioList } from "./StudioList";
import { Link, useRouteLoaderData } from "react-router";
import { IoChevronForwardOutline } from "react-icons/io5";
import { NavLink } from "./NavLink";
import { useSite } from "~/hooks/useSite";

export function RootMenu() {
  const { site } = useSite()
  const { menu } = useRouteLoaderData('root')

  return (
    <>
      <Link to="/" className="font-semibold">Power Yoga {site?.name}</Link>
      <StudioList />
      {menu.map((item: MenuGroup) => {
        if (item.type === 'group') return <MenuGroupButton key={item.id} item={item} />
        if (item.type === 'link') return <MenuLinkButton key={item.id} item={item} />
      })}
    </>
  )
}

function MenuGroupButton({ item }: { item: MenuGroup }) {
  const { openGroup } = useNavContext()
  return (
    <button
      className="text-md font-semibold text-cream flex justify-between items-center cursor-pointer"
      onClick={() => openGroup(item)}
      aria-label="Open studios group"
    >
      {item.text}
      <IoChevronForwardOutline size={20} />
    </button>
  )
}



function MenuLinkButton({ item }: { item: MenuGroup }) {
  if (!item.link) return null

  const link = {
    ...item.link,
    text: item.text
  }

  return (
    <div className="font-semibold">
      <NavLink link={link} />
    </div>
  )
}

