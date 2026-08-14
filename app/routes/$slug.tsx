import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import ComingSoon from "~/components/ComingSoon";
import { Hero } from "~/components/Hero";
import { PageLayout } from "~/components/PageLayout";
import { PAGE_QUERY } from "~/graphql/queries/pageQuery";
import { getSite } from "~/lib/getSite.server";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { slug } = params

  const payloadData = await payload.request(PAGE_QUERY, { slug })
  const pageData = payloadData.Pages?.docs[0]

  const site = getSite(request);
  const siteName = pageData?.site?.name;
  const isSitePage = siteName === site.name || siteName === 'Collective';

  if (!pageData || !isSitePage) {
    throw new Error("Page not found")
  }

  return {
    ...pageData
  }
}

export default function PageRoute() {
  const { title, banner, content } = useLoaderData<typeof loader>()


  console.log({ banner, content })
  return (
    <PageLayout>
      <Hero hero={{ title, ...banner }} />
    </PageLayout>
  )
}