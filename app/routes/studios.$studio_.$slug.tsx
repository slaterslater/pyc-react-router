import { useLoaderData, useRouteLoaderData, type LoaderFunctionArgs } from "react-router";
import { ButtonRow } from "~/components/ButtonRow";
import { ContentBlocks } from "~/components/ContentBlocks";
import { Hero } from "~/components/Hero";
import SEO from "~/components/SEO";
import { PAGE_QUERY } from "~/graphql/queries/pageQuery";
import { getSite } from "~/lib/getSite.server";
import { getStudioNav } from "~/lib/getStudioNav.server";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { slug, studio } = params

  const payloadData = await payload.request(PAGE_QUERY, { slug, studio })
  const pageData = payloadData.Pages?.docs[0]
  const studioData = payloadData.Studios?.docs[0]

  const site = getSite(request);
  const siteName = pageData?.site?.name;
  const isSitePage = siteName === site.name || siteName === 'Collective';

  if (!pageData || !isSitePage) {
    throw new Error("Page not found")
  }

  const studioNav = getStudioNav(studio, studioData)

  return {
    ...pageData,
    ...studioData,
    studioNav,
  }
}

export default function StudioSubpage() {
  const { title, banner, content, name, studioNav, metaDescription } = useLoaderData<typeof loader>()

  return (
    <>
      <SEO title={`${title} | ${name} Studio`} description={metaDescription} />
      <Hero hero={{ title, ...banner }} parallax />
      <ButtonRow buttons={studioNav} />
      <section className="w-full flex flex-col gap-4">
        {content.map((block: any) => (
          <ContentBlocks key={block.id} block={block} />
        ))}
      </section>
    </>
  )
}

