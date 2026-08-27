import { useRouteLoaderData } from "react-router";
import { Amenities } from "~/components/Amenities";
import { MindBodyWidget } from "~/components/MindbodyWidget";
import { Reviews } from "~/components/Reviews";
import type { OfferingType } from "~/components/Offering";
import Offering from "~/components/Offering";
import IntroOffer from "~/components/IntroOffer";
import { FadeIn } from "~/components/FadeIn";
import SEO from "~/components/SEO";
import Contact from "~/components/Contact";
import StudioHours from "~/components/StudioHours";

export default function IndividualStudioRoute() {
  const studio = useRouteLoaderData("routes/studios.$studio")

  return (
    <>
      <SEO title={studio.name} />
      <p className="subtitle">{studio.description}</p>
      <MindBodyWidget html={studio.schedule} key={studio.id} />
      <div className="w-full bg-cream px-8 py-10 lg:px-16 rounded-md max-w-[1200px] mx-auto mb-4">
        <div className="flex flex-col sm:flex-row gap-8 justify-between lg:px-8 w-fit sm:w-full mx-auto">
          <div className="flex flex-col">
            <span className="uppercase font-medium block pb-2">Power Yoga {studio.name}</span>
            <Contact studio={studio} />
          </div>
          <StudioHours days={studio.hoursOfOperation} />
        </div>
      </div>
      <Amenities amenities={studio.amenities} title="Studio Amenities" />
      <div className="bg-charcoal w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <h2 className="text-white text-center uppercase text-xl font-medium py-6 max-w-5xl mx-auto">
          our community
        </h2>
      </div>
      <Reviews reviews={studio.reviews} />
      {studio.offerings && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1200px] mx-auto">
          {studio.offerings.map((offering: OfferingType, i: number) => (
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