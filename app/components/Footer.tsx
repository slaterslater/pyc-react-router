import dayjs from "dayjs";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link, useRouteLoaderData } from "react-router";
import { useSite } from "~/hooks/useSite";
import { NavLink, type MenuLink } from "./navigation/NavLink";

export function Footer() {
  const { footer } = useRouteLoaderData('root')
  const { site, logoSrc } = useSite();

  return (
    <footer className="w-full min-w-xs max-w-[1450px] mx-auto px-4 flex flex-col sm:flex-row flex-wrap py-8 gap-8 bg-white">
      <div className="flex flex-col gap-5 items-center justify-between w-fit mx-auto px-8 order-1">
        <Link to="/">
          <img src={logoSrc} alt="logo" width={150} />
        </Link>
        <div className="flex items-center gap-6 text-light-gray">
          <FaFacebook size={25} />
          <FaLinkedin size={25} />
          <FaYoutube size={25} />
          <FaInstagram size={25} />
        </div>
      </div>
      <nav className="grid grid-cols-1 sm:grid-cols-3 gap-8 order-0 sm:order-2 max-w-[700px] flex-1 pl-4">
        {footer.map(({ id, title, links }: { id: string, title: string, links: MenuLink[] }) => (
          <div key={id}>
            <h3 className="font-bold mb-3">{title}</h3>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <NavLink link={link} key={link.id} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <p className="w-full basis-full mt-4 text-center text-sm uppercase order-3">{`© ${dayjs().year()} Power Yoga ${site.name}`}</p>
    </footer>
  )
}
