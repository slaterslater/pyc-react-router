import { NavLink, type MenuLink } from "./navigation/NavLink";

export function PYCButton({ button }: { button: MenuLink }) {
  const hasButtonLink = button.url || button.mboLink || button.page;
  if (!hasButtonLink) return null;
  return (
    <div className="flex justify-center items-center gap-2 mt-4 text-white border border-white rounded-md px-4 py-2 bg-black/40">
      <img src="/pyc-icon.png" alt="" className="w-3 h-3" />
      <NavLink link={button} className="underline uppercase" />
    </div>
  )
}