import { useRef, useState } from "react";
import { useEventListener, useMediaQuery } from "usehooks-ts";

type HeroProps = {
  hero: {
    title: string;
    media?: {
      sizes:
      {
        desktop: { url: string },
        tablet: { url: string }
      }
    };
  };
};

export function Hero({ hero }: HeroProps) {
  return (
    <div className="w-full px-4">
      <HeroMedia media={hero.media} />
      <HeroTitle title={hero.title} />
    </div>
  );
}

function HeroMedia({ media }: { media: HeroProps['hero']['media'] }) {
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

  if (!media) return null;

  return (
    <div
      ref={heroRef}
      className="relative h-[390px] md:h-[500px] overflow-hidden rounded-md"
    >
      <img
        src={media.sizes.tablet.url}
        alt=""
        className="md:hidden absolute inset-0 h-full w-full object-cover bg-charcoal"
      />
      <img
        src={media.sizes.desktop.url || media.sizes.tablet.url}
        alt=""
        className="hidden md:block absolute bg-charcoal left-1/2 top-[-10%] h-[120%] w-[102%] max-w-none -translate-x-1/2 object-cover will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      />
    </div>
  );
}

function HeroTitle({ title }: { title: string }) {
  if (!title) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="heading text-2xl font-bold text-center text-white pointer-events-auto"
        style={{ textShadow: "0 6px 24px rgba(0,0,0,0.90), 0 1.5px 14px rgba(0,0,0,0.60)" }}
      >
        {title}
      </div>
    </div>
  );
}