import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ContentBlocks } from "~/components/ContentBlocks";
import { Hero } from "~/components/Hero";
import { PageLayout } from "~/components/PageLayout";
import SEO from "~/components/SEO";
import { BLOG_QUERY } from "~/graphql/queries/blogQuery";
import { useAnalytics } from "~/hooks/useAnalytics";
import { getSite } from "~/lib/getSite.server";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { slug } = params

  const payloadData = await payload.request(BLOG_QUERY, { slug })
  const blogData = payloadData.Blogs?.docs[0]

  const site = getSite(request);
  const siteName = blogData?.site?.name;
  const isBlogPage = siteName === site.name || siteName === 'Collective';

  if (!blogData || !isBlogPage) {
    throw new Error("Page not found")
  }

  return {
    ...blogData
  }
}

export default function BlogRoute() {
  const { title, banner, content, metaDescription, slug } = useLoaderData<typeof loader>()

  useAnalytics({
    pageType: 'blog_post',
    pageSlug: slug,
  });

  return (
    <PageLayout>
      <SEO title={`${title} | Blog`} description={metaDescription} />
      <Hero hero={{ title, ...banner }} parallax />
      <section className="w-full flex flex-col gap-4">
        {content.map((block: any) => (
          <ContentBlocks key={block.id} block={block} />
        ))}
      </section>
    </PageLayout>
  )
}