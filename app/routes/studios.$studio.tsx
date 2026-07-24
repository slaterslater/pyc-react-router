import { Outlet, type LoaderFunctionArgs } from "react-router";
import { PageLayout } from "~/components/PageLayout";
import { STUDIO_QUERY } from "~/graphql/queries/studioQuery";
import { getSite } from "~/lib/getSite.server";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ request, params }: LoaderFunctionArgs) {


  const { studio } = params

  const payloadData = await payload.request(STUDIO_QUERY, { studio })
  const studioData = payloadData.Studios?.docs[0]

  const hasWorkshops = Boolean(studioData?.workshops?.docs[0]?.id)
  const offerings = studioData?.offerings?.docs[0]?.offeringBlocks

  const url = new URL(request.url);
  const site = getSite(url);
  const isSiteStudio = studioData?.site?.name === site.name;

  if (!studioData || !isSiteStudio) {
    throw new Error("Studio not found")
  }

  const defaultNav = [
    ...(hasWorkshops ? [{
      id: 'workshops',
      text: 'Workshops',
      type: 'internal',
      page: {
        slug: `studios/${studio}/workshops`,
      },
    }] : []),
    {
      id: 'teaching-team',
      text: 'Teaching Team',
      type: 'internal',
      page: {
        slug: `studios/${studio}/teaching-team`,
      },
    }
  ]

  return {
    ...studioData,
    studioNav: [...defaultNav, ...studioData.studioNav],
    amenities: studioData.amenities.sort((a: any, b: any) => a.name.localeCompare(b.name)),
    offerings,
    siteName: site.name,
  }
}

export default function StudioLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}