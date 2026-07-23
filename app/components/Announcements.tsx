import { useState } from "react";
import { useRouteLoaderData } from "react-router"
import { useInterval } from "usehooks-ts";
import { useCyclicCounter } from "~/hooks/useCyclicCounter";
import { NavLink, type MenuLink } from "./navigation/NavLink";

export function Announcements() {
  const { announcements } = useRouteLoaderData('root')
  const { count, increment } = useCyclicCounter(announcements?.length ?? 0);
  const [isPaused, setIsPaused] = useState(false);
  useInterval(increment, isPaused ? null : 5000);

  if (!announcements || announcements.length === 0) return null;

  return (
    <div
      className="bg-charcoal text-cream min-w-xs w-full py-3 overflow-hidden relative h-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {announcements.map((announcement: Announcement, i: number) => <Announcement key={announcement.id} announcement={announcement} isActive={Boolean(count === i)} />)}
    </div>
  )
}

function Announcement({ announcement, isActive }: { announcement: Announcement, isActive: boolean }) {
  const link = announcement.hasLink ? { ...announcement.link, text: announcement.text } : null;
  const linkStyles = isActive ? 'opacity-100' : 'opacity-0 pointer-events-none';
  return (
    // <div className="w-full text-center text-xs font-bold uppercase transition-opacity duration-500 absolute inset-0 flex items-center justify-center" style={{ opacity: isActive ? 1 : 0 }}>
    <div className={`w-full text-center text-[10px] sm:text-xs font-semibold uppercase transition-opacity duration-500 absolute inset-0 flex items-center justify-center ${linkStyles}`}>
      {link ? <NavLink link={link as MenuLink} /> : announcement.text}
    </div>
  )
}

type Announcement = {
  id: string;
  text: string;
  hasLink: boolean;
  link: {
    type: string;
    url: string;
    page: {
      slug: string;
    };
    mboLink: string;
  };
}