import { useRouteLoaderData } from "react-router";
import { Amenities } from "~/components/Amenities";
import { MindBodyWidget } from "~/components/MindbodyWidget";
import { Reviews } from "~/components/Reviews";
import type { OfferingType } from "~/components/Offering";
import Offering from "~/components/Offering";
import IntroOffer from "~/components/IntroOffer";
import { FadeIn } from "~/components/FadeIn";
import SEO from "~/components/SEO";

export default function IndividualStudioRoute() {
  const { id, name, description, schedule, amenities, reviews, offerings } = useRouteLoaderData("routes/studios.$studio")

  return (
    <>
      <SEO title={name} />
      <p className="subtitle">{description}</p>
      <MindBodyWidget html={schedule} key={id} />
      <Amenities amenities={amenities} title="Studio Amenities" />
      <div className="bg-charcoal w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <h2 className="text-white text-center uppercase text-xl font-medium py-6 max-w-5xl mx-auto">
          our community
        </h2>
      </div>
      <Reviews reviews={reviews} />
      {offerings && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 max-w-[1200px] mx-auto">
          {offerings.map((offering: OfferingType, i: number) => (
            <FadeIn key={i} delay={i * 0.08} className="h-full grid">
              <Offering key={offering.id} offering={offering} />
            </FadeIn>
          ))}
        </section>
      )}
      <IntroOffer />
    </>
  )
}