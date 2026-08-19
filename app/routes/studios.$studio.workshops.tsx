import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Amenities } from "~/components/Amenities";
import { FadeIn } from "~/components/FadeIn";
import { Hero } from "~/components/Hero";
import LocationMap from "~/components/LocationMap";
import Offering, { type OfferingType } from "~/components/Offering";
import { STUDIO_WORKSHOP_QUERY } from "~/graphql/queries/studioWorkshopQuery";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { studio } = params;
  const data = await payload.request(STUDIO_WORKSHOP_QUERY, { studio })
  const studioData = data.Studios.docs[0];
  const workshops = studioData.workshops.docs[0]?.workshops;
  const offerings = studioData.offerings.docs[0]?.offerings;

  const addressParts = [
    studioData.address1,
    studioData.address2,
    studioData.city,
    studioData.province,
    studioData.state,
    studioData.zip,
    studioData.postalCode,
  ].filter(Boolean);

  const fullAddress = addressParts.join(" ");

  return {
    ...studioData,
    workshops,
    offerings,
    fullAddress,
  }
}

export default function StudioWorkshops() {
  const { amenities, fullAddress } = useLoaderData<typeof loader>();

  return (
    <>
      <Amenities amenities={amenities} />
      <Workshops />
      <SweatDiscoverTransform />
      <LocationMap fullAddress={`power yoga ${fullAddress}`} />
      <Offerings />
    </>
  )
}

function SweatDiscoverTransform() {
  const spanSpacing = "px-4";
  return (
    <h2 className="hidden md:block heading text-center uppercase py-4">sweat <span className={spanSpacing}>|</span> discover <span className={spanSpacing}>|</span> transform</h2>
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
          <FadeIn key={workshop.id} delay={i * 0.08} className="h-full grid">
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
          <FadeIn key={offering.id} delay={i * 0.08} className="h-full grid">
            <Offering key={offering.id} offering={offering} />
          </FadeIn>
        ))}
      </section>
    </>
  )
}
