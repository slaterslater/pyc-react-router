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
import LocationMap from "~/components/LocationMap";
import { Hero } from "~/components/Hero";
import { isNavLink } from "~/lib/isNavLink";
import { useAnalytics } from "~/hooks/useAnalytics";

export default function IndividualStudioRoute() {
  const studio = useRouteLoaderData("routes/studios.$studio")

  useAnalytics({ pageType: 'studio', studioSlug: studio.slug, studioGa4Id: studio.analytics?.ga4MeasurementId ?? undefined })

  return (
    <>
      <SEO title={studio.name} description={studio.seoDescription} />
      <p className="subtitle">{studio.description}</p>
      <MindBodyWidget html={studio.schedule} key={studio.id} />
      <StudioLocation />
      <Amenities amenities={studio.amenities} title="Studio Amenities" />
      <IntroOffer />
      <StudioFeatures />
      <div className="bg-charcoal w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <h2 className="text-white text-center uppercase text-xl font-medium py-6 max-w-5xl mx-auto">
          our community
        </h2>
      </div>
      <Reviews reviews={studio.reviews} />
      <Hero hero={studio.banner2} />
      <StudioOfferings />
      <IntroOffer />
    </>
  )
}

function StudioLocation() {
  const studio = useRouteLoaderData("routes/studios.$studio")
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 rounded-md w-full mx-auto bg-cream py-8 lg:pr-8 mb-4">
      <LocationMap fullAddress={studio.fullAddress} />
      <div className="flex flex-col sm:flex-row gap-4 lg:flex-col sm:w-full justify-around gap-4 mx-auto px-4">
        <div className="flex flex-col">
          <span className="uppercase font-medium block pb-2">PYC {studio.name}</span>
          <Contact studio={studio} />
        </div>
        <StudioHours days={studio.hoursOfOperation} />
      </div>
    </div>
  )
}

function StudioFeatures() {
  const studio = useRouteLoaderData("routes/studios.$studio")

  const isValidFeature = (feature: any) => {
    const { title, media, button } = feature
    return title || media || isNavLink(button)
  }
  const features = [studio.feature1, studio.feature2].filter(isValidFeature)

  if (!features.length) return null

  return (
    <section className={`grid grid-cols-1 md:grid-cols-${features.length} gap-4 max-w-[1200px] mx-auto w-full`}>
      {features.map((feature) => (
        <Hero key={feature.id} hero={feature} />
      ))}
    </section>

  )
}

function StudioOfferings() {
  const studio = useRouteLoaderData("routes/studios.$studio")
  if (!studio.offerings) return null
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1200px] mx-auto">
      {studio.offerings.map((offering: OfferingType, i: number) => (
        <FadeIn key={i} delay={i * 0.08} className="h-full grid">
          <Offering key={offering.id} offering={offering} />
        </FadeIn>
      ))}
    </section>
  )
}