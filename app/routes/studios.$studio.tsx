import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Amenities } from "~/components/Amenities";
import { ButtonRow } from "~/components/ButtonRow";
import { Hero } from "~/components/Hero";
import { MindBodyWidget } from "~/components/MindbodyWidget";
import { PageLayout } from "~/components/PageLayout";
import { Reviews } from "~/components/Reviews";
import { STUDIO_QUERY } from "~/graphql/queries/studioQuery";
import { getSite } from "~/lib/getSite.server";
import { payloadClient } from "~/lib/payloadClient.server";

export function meta() {
  return [
    { title: "studio page | dev PYC" },
    { name: "description", content: "studio page" },
  ];
}

export async function loader({ request, params }: LoaderFunctionArgs) {


  const { studio } = params

  const payloadData = await payloadClient.request(STUDIO_QUERY, { studio })
  const studioData = payloadData.Studios?.docs[0]

  const url = new URL(request.url);
  const site = getSite(url);
  const isSiteStudio = studioData?.site?.name === site.name;

  if (!studioData || !isSiteStudio) {
    throw new Error("Studio not found")
  }

  return {
    ...studioData
  }
}

export default function StudioRoute() {
  const { id, banner, description, schedule, amenities, studioNav } = useLoaderData<typeof loader>()

  // console.log({ banner, description, schedule, studioNav })

  return (
    <PageLayout>
      <Hero hero={banner} />
      <ButtonRow buttons={studioNav} />
      <p className="mx-auto text-center text-light-gray max-w-4xl leading-relaxed text-lg font-medium px-4">{description}</p>
      <MindBodyWidget html={schedule} key={id} />
      <Amenities amenities={amenities} />
      <Reviews />
      {/* <p className="mx-auto text-center text-light-gray max-w-5xl leading-relaxed text-2xl font-medium px-4 py-7">Power Yoga Collective is your home for hot power yoga. Our locally operated studios deliver heated classes that build strength, flexibility, and resilience, while fostering connection, consistency, and community across every location.</p> */}
    </PageLayout>
  )
}