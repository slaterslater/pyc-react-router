import { useLoaderData, useRouteLoaderData, type LoaderFunctionArgs } from "react-router";
import { Amenities } from "~/components/Amenities";
import { ButtonRow } from "~/components/ButtonRow";
import { Hero } from "~/components/Hero";
import { MindBodyWidget } from "~/components/MindbodyWidget";
import { Reviews } from "~/components/Reviews";
import type { loader } from "./studios.$studio";
// import { STUDIO_QUERY } from "~/graphql/queries/studioQuery";
// import { getSite } from "~/lib/getSite.server";
// import { payload } from "~/lib/payloadClient.server";

// export function meta() {
//   const { name, siteName } = useLoaderData<typeof loader>()
//   return [
//     { title: `${name} | Power Yoga ${siteName}` },
//     { name: "description", content: "studio page" },
//   ];
// }

export default function IndividualStudioRoute() {
  // const { id, banner, description, schedule, amenities, studioNav } = useLoaderData<typeof loader>()
  const { id, banner, description, schedule, amenities, studioNav } = useRouteLoaderData("routes/studios.$studio")

  return (
    <>
      <Hero hero={banner} />
      <ButtonRow buttons={studioNav} />
      <p className="mx-auto text-center text-light-gray max-w-4xl leading-relaxed text-lg font-medium px-4">{description}</p>
      <MindBodyWidget html={schedule} key={id} />
      <Amenities amenities={amenities} />
      <Reviews />
      {/* <p className="mx-auto text-center text-light-gray max-w-5xl leading-relaxed text-2xl font-medium px-4 py-7">Power Yoga Collective is your home for hot power yoga. Our locally operated studios deliver heated classes that build strength, flexibility, and resilience, while fostering connection, consistency, and community across every location.</p> */}
    </>
  )
}