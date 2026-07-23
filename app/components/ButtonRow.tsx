import { NavLink, type MenuLink } from "./navigation/NavLink";

export function ButtonRow({ buttons }: { buttons: MenuLink[] }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 w-full px-8">
      {buttons.map((button) => (
        <NavLink
          key={button.id}
          link={button}
          className="button btn-black min-w-[140px] sm:max-w-[220px] flex-1"
        />
      ))}
    </div>
  )
}
