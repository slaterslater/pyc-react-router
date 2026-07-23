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
  const isSitePage = pageData?.site?.name === site.name;

  if (!pageData || !isSitePage) {
    throw new Error("Page not found")
  }

  return {
    ...pageData
  }
}

export default function PageRoute() {
  const { title } = useLoaderData<typeof loader>()

  console.log({ title })
  return (
    <PageLayout>
      <h1>{title}</h1>
    </PageLayout>
  )
}