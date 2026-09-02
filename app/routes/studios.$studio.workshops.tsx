import { useLoaderData, useRouteLoaderData, type LoaderFunctionArgs } from "react-router";
import { Amenities } from "~/components/Amenities";
import { FadeIn } from "~/components/FadeIn";
import { Hero } from "~/components/Hero";
import LocationMap from "~/components/LocationMap";
import Offering, { type OfferingType } from "~/components/Offering";
import SEO from "~/components/SEO";
import { SweatDiscoverTransform } from "~/components/SweatDiscoverTransform";
import { STUDIO_WORKSHOP_QUERY } from "~/graphql/queries/studioWorkshopQuery";
import { useAnalytics } from "~/hooks/useAnalytics";
import { useStudio } from "~/hooks/useStudio";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { studio } = params;
  const data = await payload.request(STUDIO_WORKSHOP_QUERY, { studio })
  const studioData = data.Studios.docs[0];
  const workshops = studioData.workshops.docs[0]?.workshops;
  const offerings = studioData.offerings.docs[0]?.offerings;

  return {
    ...studioData,
    workshops,
    offerings,
  }
}

export default function StudioWorkshops() {
  const { amenities, name } = useLoaderData<typeof loader>();
  const studio = useRouteLoaderData("routes/studios.$studio")

  useAnalytics({
    pageType: 'studio_workshops',
    studioSlug: studio.slug,
    studioGa4Id: studio.analytics?.ga4MeasurementId ?? undefined,
  });

  return (
    <>
      <SEO title={`Workshops | ${name} Studio`} description="Check out your local PYC studio for their workshop schedule. Studios run different workshops at different times throughout the year. To reserve your spot, you must pre-register and pay for the workshop. You can do this either online or in person. There is a no refund policy for all workshops and programs. ENROLL NOW CHOOSE" />
      <Amenities amenities={amenities} />
      <Workshops />
      <SweatDiscoverTransform />
      <LocationMap fullAddress={`power yoga ${studio.fullAddress}`} />
      <Offerings />
    </>
  )
}

function Workshops() {
  const { workshops } = useLoaderData<typeof loader>();
  if (!workshops) return null;
  return (
    <>
      <h2 className="heading text-center uppercase py-4">Workshops</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {workshops?.map((workshop: OfferingType, i: number) => (
          <FadeIn key={i} delay={i * 0.08} className="h-full grid">
            <Offering key={workshop.id} offering={workshop} />
          </FadeIn>
        ))}
      </section>
    </>
  )
}

function Offerings() {
  const { offerings } = useLoaderData<typeof loader>();
  if (!offerings) return null;
  return (
    <>
      <h2 className="heading text-center">Classes</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {offerings?.map((offering: OfferingType, i: number) => (
          <FadeIn key={i} delay={i * 0.08} className="h-full grid">
            <Offering key={offering.id} offering={offering} />
          </FadeIn>
        ))}
      </section>
    </>
  )
}
