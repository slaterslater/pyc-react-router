import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ContentBlocks } from "~/components/ContentBlocks";
import { Hero } from "~/components/Hero";
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

export default function StudioSubpage() {
  const { title, banner, content } = useLoaderData<typeof loader>()

  console.log({ content })

  return (
    <>
      <Hero hero={{ title, ...banner }} />
      <section className="w-full flex flex-col gap-4">
        {content.map((block: any) => (
          <ContentBlocks key={block.id} block={block} />
        ))}
      </section>
    </>
  )
}

