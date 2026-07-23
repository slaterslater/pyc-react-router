import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { PageLayout } from "~/components/PageLayout";
import { PAGE_QUERY } from "~/graphql/queries/pageQuery";
import { getSite } from "~/lib/getSite.server";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { slug } = params

  const payloadData = await payload.request(PAGE_QUERY, { slug })
  const pageData = payloadData.Pages?.docs[0]

  const url = new URL(request.url);
  const site = getSite(url);
  const siteName = pageData?.site?.name;
  const isSitePage = siteName === site.name || siteName === 'Collective';

  console.log({ pageData, isSitePage })

  if (!pageData || !isSitePage) {
    throw new Error("Page not found")
  }

  return {
    ...pageData
  }
}

export default function PageRoute() {
  const { title } = useLoaderData<typeof loader>()

  return (
    <PageLayout>
      <h1 className="heading text-center">{title}</h1>
      <p className="text-center">coming soon</p>
    </PageLayout>
  )
}