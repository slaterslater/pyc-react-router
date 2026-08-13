import { useRouteLoaderData } from "react-router";
import { Amenities } from "~/components/Amenities";
import { ButtonRow } from "~/components/ButtonRow";
import { Hero } from "~/components/Hero";
import { MindBodyWidget } from "~/components/MindbodyWidget";
import { Reviews } from "~/components/Reviews";
import type { OfferingType } from "~/components/Offering";
import Offering from "~/components/Offering";
import IntroOffer from "~/components/IntroOffer";

export function meta() {
  const { name, siteName } = useRouteLoaderData("routes/studios.$studio")
  return [
    { title: `${name} | Power Yoga ${siteName}` },
    { name: "description", content: "studio page" },
  ];
}

export default function IndividualStudioRoute() {
  const { id, banner, description, schedule, amenities, studioNav, offerings } = useRouteLoaderData("routes/studios.$studio")

  return (
    <>
      <Hero hero={banner} />
      <ButtonRow buttons={studioNav} />
      <p className="big-copy">{description}</p>
      <MindBodyWidget html={schedule} key={id} />
      <Amenities amenities={amenities} title="Studio Amenities" />
      <Reviews />
      {/* <p className="mx-auto text-center text-light-gray max-w-5xl leading-relaxed text-2xl font-medium px-4 py-7">Power Yoga Collective is your home for hot power yoga. Our locally operated studios deliver heated classes that build strength, flexibility, and resilience, while fostering connection, consistency, and community across every location.</p> */}
      {offerings && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          {offerings.map((offering: OfferingType) => <Offering key={offering.id} offering={offering} />)}
        </section>
      )}
      <IntroOffer />
    </>
  )
}