import { useRef, useState } from "react";
import { useEventListener, useMediaQuery } from "usehooks-ts";

type HeroProps = {
  hero: {
    title: string;
    media?: {
      sizes:
      {
        desktop: { url: string },
        thumbnail: { url: string }
      }
    };
  };
};

export function Hero({ hero }: HeroProps) {

  const heroRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const onScroll = () => {
    if (prefersReducedMotion) return;
    const hero = heroRef.current;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const clamped = Math.min(Math.max(progress, 0), 1);

    // Tune this multiplier for stronger/weaker parallax
    setOffset((clamped - 0.5) * 250);
  };

  useEventListener('scroll', onScroll)

  const media = hero?.media

  return (
    <div className="w-full px-4">
      {media && (
        <div
          ref={heroRef}
          className="relative h-[390px] md:h-[500px] overflow-hidden rounded-md"
        >
          <img
            src={media.sizes.thumbnail.url}
            alt=""
            className="md:hidden absolute inset-0 h-full w-full object-cover bg-charcoal"
          />
          <img
            src={media.sizes.desktop.url}
            alt=""
            className="hidden md:block absolute bg-charcoal left-1/2 top-[-10%] h-[120%] w-[102%] max-w-none -translate-x-1/2 object-cover will-change-transform"
            style={{ transform: `translate3d(0, ${offset}px, 0)` }}
          />
        </div>
      )}
    </div>
  );
}