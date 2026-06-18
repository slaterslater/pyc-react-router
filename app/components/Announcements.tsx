import { useState } from "react";
import { useRouteLoaderData } from "react-router"
import { useInterval } from "usehooks-ts";
import { useCyclicCounter } from "~/hooks/useCyclicCounter";

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
      {announcements.map((announcement: Announcement, i: number) => (
        <div
          key={i}
          className="w-full text-center text-xs font-bold uppercase transition-opacity duration-500 absolute inset-0 flex items-center justify-center"
          style={{ opacity: count === i ? 1 : 0 }}
        >
          {announcement.text}
        </div>
      ))}
    </div>
  )
}

type Announcement = {
  text: string;
}