import { useRef, useState } from "react";
import { useEventListener, useMediaQuery } from "usehooks-ts";
import { type MenuLink } from "./navigation/NavLink";
import { PYCButton } from "./PYCbutton";
import { getMimeType } from "~/lib/getMimeType";
import { supabaseImage } from "~/lib/supabaseImage";

export function Hero({ hero, parallax = false }: HeroProps) {
  const { title, media, button } = hero
  if (!title && !media) return null

  return (
    <div className="w-full relative">
      <HeroMedia media={media} parallax={parallax} />
      <HeroTitle title={title} />
      <HeroButton button={button} />
    </div>
  );
}

function HeroMedia({ media, parallax }: HeroMediaProps) {
  const mimeType = getMimeType(media?.mimeType);
  switch (mimeType) {
    case 'video':
      return <HeroVideo media={media} parallax={false} />;
    case 'image':
      return <HeroImage media={media} parallax={parallax} />;
    default:
      return <div className="relative h-[390px] md:h-[500px] overflow-hidden rounded-md bg-charcoal" />;
  }
}

function HeroVideo({ media }: HeroMediaProps) {
  return (
    <div className="relative h-[390px] md:h-[500px] overflow-hidden rounded-md">
      <video src={media?.url} autoPlay muted loop className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}

function HeroImage({ media, parallax }: HeroMediaProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 768px)"); // matches Tailwind's `md`

  const onScroll = () => {
    if (prefersReducedMotion || !parallax || !isDesktop) return;
    const hero = heroRef.current;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const clamped = Math.min(Math.max(progress, 0), 1);

    // Tune this multiplier for stronger/weaker parallax
    setOffset((clamped - 0.5) * 250);
  };

  useEventListener('scroll', onScroll);

  if (!media) return <div className="relative h-[390px] md:h-[500px] overflow-hidden rounded-md bg-charcoal" />;

  const { tablet, desktop } = media.sizes;
  const tabletSrc = supabaseImage(tablet.filename);
  const desktopSrc = supabaseImage(desktop.filename);
  const originalSrc = supabaseImage(media.filename);

  return (
    <div
      ref={heroRef}
      className="relative h-[390px] md:h-[500px] overflow-hidden rounded-md"
    >
      <picture>
        {desktopSrc && <source media="(min-width: 768px)" srcSet={desktopSrc} />}
        {/* <img
          src={tablet.url || media.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover bg-charcoal will-change-transform
            md:left-1/2 md:top-[-10%] md:h-[120%] md:w-[102%] md:inset-auto md:max-w-none"
          style={isDesktop ? { transform: `translate3d(-50%, ${offset}px, 0)` } : undefined}
        /> */}
        <img
          src={tabletSrc || originalSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover bg-charcoal will-change-transform
    md:left-1/2 md:top-[-10%] md:h-[120%] md:w-[102%] md:inset-auto md:max-w-none
    md:[transform:translate3d(-50%,var(--parallax-y,0px),0)]"
          style={{ ["--parallax-y" as string]: `${offset}px` }}
        />
      </picture>
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

type HeroProps = {
  hero: {
    title: string;
    media?: {
      mimeType: string;
      url: string;
      filename: string;
      sizes:
      {
        desktop: { url: string, filename: string },
        tablet: { url: string, filename: string }
      }
    };
    button?: MenuLink;
  };
  parallax?: boolean;
};

type HeroMediaProps = {
  media: HeroProps['hero']['media'];
  parallax: boolean;
};