import { useRef, useState } from "react";
import { useEventListener, useMediaQuery } from "usehooks-ts";
import { type MenuLink } from "./navigation/NavLink";
import { PYCButton } from "./PYCbutton";

type HeroProps = {
  hero: {
    title: string;
    media?: {
      url: string;
      sizes:
      {
        desktop: { url: string },
        tablet: { url: string }
      }
    };
    button?: MenuLink;
  };
  parallax?: boolean;
};

export function Hero({ hero, parallax = true }: HeroProps) {
  console.log({ hero });
  return (
    <div className="w-full relative">
      <HeroMedia media={hero.media} parallax={parallax} />
      <HeroTitle title={hero.title} />
      <HeroButton button={hero.button} />
    </div>
  );
}

function HeroMedia({ media, parallax }: { media: HeroProps['hero']['media'], parallax: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const onScroll = () => {
    if (prefersReducedMotion || !parallax) return;
    const hero = heroRef.current;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const clamped = Math.min(Math.max(progress, 0), 1);

    // Tune this multiplier for stronger/weaker parallax
    setOffset((clamped - 0.5) * 250);
  };

  useEventListener('scroll', onScroll)

  if (!media) return <div className="relative h-[390px] md:h-[500px] overflow-hidden rounded-md bg-charcoal" />;

  const { tablet, desktop } = media.sizes;

  return (
    <div
      ref={heroRef}
      className="relative h-[390px] md:h-[500px] overflow-hidden rounded-md"
    >
      <img
        src={tablet.url || media.url}
        alt=""
        className="md:hidden absolute inset-0 h-full w-full object-cover bg-charcoal"
      />
      <img
        src={desktop.url || tablet.url || media.url}
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
        className="heading text-2xl font-bold text-center text-white pointer-events-auto px-8"
      // style={{ textShadow: "0 6px 24px rgba(0,0,0,0.90), 0 1.5px 14px rgba(0,0,0,0.60)" }}
      >
        {title}
      </div>
    </div>
  );
}

function HeroButton({ button }: { button: MenuLink | undefined }) {
  if (!button) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-auto mt-45">
      <PYCButton button={button} />
    </div>
  );
}