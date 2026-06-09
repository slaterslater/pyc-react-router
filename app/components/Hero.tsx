import { useEffect, useRef, useState } from "react";

type HeroProps = {
  hero: {
    title: string;
    media: { url: string };
  };
};

export function Hero({ hero }: HeroProps) {
  const { media } = hero;
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clamped = Math.min(Math.max(progress, 0), 1);

      // Tune this multiplier for stronger/weaker parallax
      setOffset((clamped - 0.5) * 250);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full px-4">
      <div
        ref={containerRef}
        className="relative h-[390px] md:h-[500px] overflow-hidden rounded-md"
      >
        <img
          src={media.url}
          alt=""
          className="absolute left-0 top-[-10%] w-full h-[120%] object-cover will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        />
      </div>
    </div>
  );
}


// export function Hero({ hero, bgColor = "charcoal", textColor = "white" }: { title: string, bgColor?: "charcoal" | "cream", textColor?: "white" | "charcoal" }) {
//   const { title, media } = hero
//   return (
//     <div className="w-full px-2 md:px-4">
//       <img src={media.url} alt="" className="w-full h-[575px] md:h-[650px] object-cover rounded-md" />
//       {/* <div
//         className="w-full h-[575px] md:h-[650px] flex justify-center items-center uppercase font-bold text-lg rounded-md"
//         style={{ backgroundColor: bgColor === "charcoal" ? "var(--color-charcoal)" : "var(--color-cream)", color: textColor === "white" ? "var(--color-white)" : "var(--color-charcoal)" }}
//       >
//         {title}
//       </div> */}
//     </div>
//   )
// }