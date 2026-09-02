import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ContentBlocks } from "~/components/ContentBlocks";
import { Hero } from "~/components/Hero";
import { PageLayout } from "~/components/PageLayout";
import SEO from "~/components/SEO";
import { PAGE_QUERY } from "~/graphql/queries/pageQuery";
import { useAnalytics } from "~/hooks/useAnalytics";
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
  const { title, banner, content, metaDescription, slug } = useLoaderData<typeof loader>()

  useAnalytics({
    pageType: 'page',
    pageSlug: slug,
  });

  return (
    <PageLayout>
      <SEO title={title} description={metaDescription} />
      <Hero hero={{ title, ...banner }} parallax />
      <section className="w-full flex flex-col gap-4">
        {content.map((block: any) => (
          <ContentBlocks key={block.id} block={block} />
        ))}
      </section>
    </PageLayout>
  )
}