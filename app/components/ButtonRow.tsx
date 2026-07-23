import { Link } from "react-router";
import { NavLink, type MenuLink } from "./navigation/NavLink";

export function ButtonRow({ buttons }: Buttons) {

  console.log({ buttons })

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 w-full px-8">
      {buttons.map((button) => (
        // <Link to="/" className="button btn-black min-w-[140px] sm:max-w-[220px] flex-1" key={button.text}>
        //   {button.text}
        // </Link>
        // <div key={button.text} className="button btn-black min-w-[140px] sm:max-w-[220px] flex-1"><NavLink link={button as MenuLink} /></div>
        <NavLink link={button as MenuLink} className="button btn-black min-w-[140px] sm:max-w-[220px] flex-1 py-1.5" />
      ))}
    </div>
  )
}

type Buttons = {
  buttons: { text: string }[]
}