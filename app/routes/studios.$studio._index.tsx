import { useRouteLoaderData } from "react-router";
import { Amenities } from "~/components/Amenities";
import { ButtonRow } from "~/components/ButtonRow";
import { Hero } from "~/components/Hero";
import { MindBodyWidget } from "~/components/MindbodyWidget";
import { Reviews } from "~/components/Reviews";
import type { OfferingType } from "~/components/Offering";
import Offering from "~/components/Offering";
import IntroOffer from "~/components/IntroOffer";
import { FadeIn } from "~/components/FadeIn";

export function meta() {
  const { name, siteName } = useRouteLoaderData("routes/studios.$studio")
  return [
    { title: `${name} | Power Yoga ${siteName}` },
    { name: "description", content: "studio page" },
  ];
}

export default function IndividualStudioRoute() {
  const { id, description, schedule, amenities, reviews, offerings } = useRouteLoaderData("routes/studios.$studio")

  return (
    <>
      {/* <Hero hero={banner} /> */}
      {/* <ButtonRow buttons={studioNav} /> */}
      <p className="subtitle">{description}</p>
      <MindBodyWidget html={schedule} key={id} />
      <Amenities amenities={amenities} title="Studio Amenities" />
      <div className="bg-charcoal w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <h2 className="text-white text-center uppercase text-xl font-medium py-6 max-w-5xl mx-auto">
          our community
        </h2>
      </div>
      <Reviews reviews={reviews} />
      {/* <p className="mx-auto text-center text-light-gray max-w-5xl leading-relaxed text-2xl font-medium px-4 py-7">Power Yoga Collective is your home for hot power yoga. Our locally operated studios deliver heated classes that build strength, flexibility, and resilience, while fostering connection, consistency, and community across every location.</p> */}
      {offerings && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 max-w-[1200px] mx-auto">
          {offerings.map((offering: OfferingType, i: number) => (
            <FadeIn key={offering.id} delay={i * 0.08} className="h-full grid">
              <Offering key={offering.id} offering={offering} />
            </FadeIn>
          ))}
        </section>
      )}
      <IntroOffer />
    </>
  )
}