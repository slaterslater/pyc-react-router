import { Link } from "react-router";
import { useNavContext } from "./NavProvider";
import { MindbodyLink } from "../MindbodyLink";

export function NavLink({ link, className }: { link: MenuLink, className?: string }) {
  if (link.type === 'external') return <External link={link} className={className} />
  if (link.type === 'internal') return <Internal link={link} className={className} />
  if (link.type === 'mindbody') return <Mindbody link={link} className={className} />
  return null;
}

function External({ link, className }: { link: MenuLink, className?: string }) {
  const { closeNav } = useNavContext()
  if (!link.url) return null;

  const href = /^https?:\/\//i.test(link.url)
    ? link.url
    : `https://${link.url}`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={closeNav} className={className}>
      {link.text}
    </a>
  )
}

function Internal({ link, className }: { link: MenuLink, className?: string }) {
  const { closeNav } = useNavContext()
  if (!link.page) return null;

  const { slug, studio } = link.page;
  let pageSlug = `/${slug}`
  if (studio) pageSlug = `/studios/${studio.slug}` + pageSlug

  return <Link to={pageSlug} onClick={closeNav} className={className}>{link.text}</Link>
}

function Mindbody({ link, className }: { link: MenuLink, className?: string }) {
  const { closeNav } = useNavContext()
  if (!link.mboLink) return null;
  return <MindbodyLink html={link.mboLink as string} onClick={closeNav} className={className}>{link.text}</MindbodyLink>
}

export type MenuLink = {
  id?: string;
  text: string;
  type: 'external' | 'internal';
  url?: string;
  mboLink?: string;
  page?: {
    slug: string;
    title: string;
    studio?: {
      slug: string;
    };
  };
}