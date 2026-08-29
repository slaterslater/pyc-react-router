import { Outlet, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ButtonRow } from "~/components/ButtonRow";
import { Hero } from "~/components/Hero";
import { STUDIO_QUERY } from "~/graphql/queries/studioQuery";
import { getSite } from "~/lib/getSite.server";
import { getStudioNav } from "~/lib/getStudioNav.server";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { studio } = params

  const payloadData = await payload.request(STUDIO_QUERY, { studio })
  const studioData = payloadData.Studios?.docs[0]

  const siteName = getSite(request).name;
  const isSiteStudio = studioData?.site?.name === siteName;

  if (!studioData || !isSiteStudio) {
    throw new Error("Studio not found")
  }

  const addressParts = [
    studioData.address1,
    studioData.address2,
    studioData.city,
    studioData.province,
    studioData.state,
    studioData.zip,
    studioData.postalCode,
  ].filter(Boolean);

  return {
    ...studioData,
    studioNav: getStudioNav(studio, studioData),
    amenities: studioData.amenities.sort((a: any, b: any) => a.name.localeCompare(b.name)),
    offerings: studioData?.offerings?.docs[0]?.offerings,
    introOffer: studioData?.offerings?.docs[0]?.introOffer,
    fullAddress: addressParts.join(" "),
    siteName,
  }
}

export default function IndividualStudioOutlet() {
  const { banner, studioNav } = useLoaderData<typeof loader>()
  return (
    <>
      <Hero hero={banner} parallax />
      <ButtonRow buttons={studioNav} />
      <Outlet />
    </>
  )
}