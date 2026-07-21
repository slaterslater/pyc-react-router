import { Link } from "react-router";
import { useNavContext } from "./NavProvider";

export function NavLink({ link }: { link: MenuLink }) {
  if (link.type === 'external') return <ExternalLink link={link} />
  if (link.type === 'internal') return <InternalLink link={link} />
}

function ExternalLink({ link }: { link: MenuLink }) {
  const { toggleNav } = useNavContext()
  if (!link.url) return null;

  const href = /^https?:\/\//i.test(link.url)
    ? link.url
    : `https://${link.url}`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={toggleNav}>
      {link.text}
    </a>
  )
}

function InternalLink({ link }: { link: MenuLink }) {
  const { toggleNav } = useNavContext()
  if (!link.page) return null;
  return <Link to={link.page.slug} onClick={toggleNav}>{link.text}</Link>
}

export type MenuLink = {
  id: string;
  text: string;
  type: 'external' | 'internal';
  url?: string;
  mboLink?: string;
  page?: {
    slug: string;
    title: string;
  };
}