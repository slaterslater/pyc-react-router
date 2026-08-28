import dayjs from "dayjs";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, useRouteLoaderData } from "react-router";
import { useSite } from "~/hooks/useSite";
import { NavLink, type MenuLink } from "./navigation/NavLink";
import { useStudio } from "~/hooks/useStudio";
import Contact from "./Contact";

export function Footer() {
  const { footer } = useRouteLoaderData('root')
  const { site, logoSrc } = useSite();
  const { studioData } = useStudio();

  return (
    <footer className="w-full min-w-xs max-w-[1450px] mx-auto px-4 flex flex-col sm:flex-row flex-wrap py-8 gap-8 bg-white">
      <div className="flex flex-col gap-5 items-center justify-between w-fit mx-auto px-8 order-1">
        {!studioData && (
          <Link to="/">
            {logoSrc && <img src={logoSrc} alt="logo" width={150} />}
          </Link>
        )}
        {studioData && (
          <div>
            <h3 className="uppercase font-bold mb-3">PYC {studioData.name}</h3>
            <Contact studio={studioData} />
          </div>
        )}
        <SocialLinks />
      </div>
      <nav className="grid grid-cols-1 sm:grid-cols-3 gap-8 order-0 sm:order-2 max-w-[700px] flex-1 pl-4">
        {footer.map(({ id, title, links }: { id: string, title: string, links: MenuLink[] }) => (
          <div key={id}>
            <h3 className="font-bold mb-3">{title}</h3>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.id}><NavLink link={link} /></li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <Link to="/" className="w-full basis-full mt-4 text-center text-sm uppercase order-3">{`© ${dayjs().year()} Power Yoga ${site.name}`}</Link>
    </footer>
  )
}

function SocialLinks() {
  const studio = useRouteLoaderData("routes/studios.$studio")
  const { instagram, facebook, tiktok, twitter, youtube } = studio ?? {}

  return (
    <div className="flex items-center gap-6 text-light-gray">
      {instagram && <SocialLink link={instagram} icon={<FaInstagram size={25} />} name="Instagram" />}
      {facebook && <SocialLink link={facebook} icon={<FaFacebook size={25} />} name="Facebook" />}
      {tiktok && <SocialLink link={tiktok} icon={<FaTiktok size={25} />} name="TikTok" />}
      {twitter && <SocialLink link={twitter} icon={<FaTwitter size={25} />} name="Twitter" />}
      {youtube && <SocialLink link={youtube} icon={<FaYoutube size={25} />} name="YouTube" />}
    </div>
  )
}

function SocialLink({ link, icon, name }: { link: string, icon: React.ReactNode, name: string }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>
      {icon}
    </a>
  )
}