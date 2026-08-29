import { isNavLink } from "~/lib/isNavLink";
import { NavLink, type MenuLink } from "./navigation/NavLink";

export function PYCButton({ button }: { button: MenuLink }) {
  if (!isNavLink(button)) return null
  return (
    <div className="flex justify-center items-center gap-2 mt-4 text-white border border-white rounded-md px-4 py-2 bg-black/40">
      <img src="/pyc-icon.png" alt="" className="w-3 h-3" />
      <NavLink link={button} className="underline uppercase text-center" />
    </div>
  )
}