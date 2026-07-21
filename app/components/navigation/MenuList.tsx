import { useRouteLoaderData } from "react-router"
import { useNavContext } from "./NavProvider"
import { IoChevronForwardOutline } from "react-icons/io5"
import type { MenuLink } from "./NavLink"

export function MenuList() {
  const { menu } = useRouteLoaderData('root')
  console.log({ menu })
  return menu.map((item) => {
    if (item.type === 'group') return <MenuGroupButton key={item.id} item={item} />
    if (item.type === 'link') return <MenuLinkButton key={item.id} item={item} />
  })
}

function MenuGroupButton({ item }) {
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

function MenuLinkButton({ item }: { item: MenuLink }) {
  // 2DO handle external, internal and mbo
  return (
    <button
      className="text-md font-semibold text-cream flex justify-between items-center cursor-pointer"
    >
      {item.text}
    </button>
  )
}