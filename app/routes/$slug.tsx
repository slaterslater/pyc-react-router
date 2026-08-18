import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import Grid from "~/components/Grid";
import { Hero } from "~/components/Hero";
import Offering from "~/components/Offering";
import { PageLayout } from "~/components/PageLayout";
import { RichText } from "~/components/RichText";
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

  console.log({ content })

  return (
    <PageLayout>
      <Hero hero={{ title, ...banner }} />
      <section className="w-full flex flex-col gap-4">
        {content.map((block: any) => (
          <ContentBlocks key={block.id} block={block} />
        ))}
      </section>
    </PageLayout>
  )
}

function ContentBlocks({ block }: { block: any }) {
  const type = block.__typename;
  switch (type) {
    case 'Grid':
      const colNum = block.columns.replace('_', '');
      return (
        <Grid columns={colNum}>{block.items?.map((item: any) => (
          <ContentBlocks key={item.id} block={item} />
        ))}
        </Grid>
      )
    case 'OfferingBlock':
      return <Offering offering={block} />
    case 'Image':
      return (
        <img
          src={block.media.sizes.tablet.url ?? block.media.url}
          alt=""
          className="w-full h-full object-cover bg-charcoal rounded-md"
        />
      )
    case "Headline":
      const { heading, subtitle } = block;
      return (
        <div className="flex flex-col gap-4 text-center py-10">
          <h2 className="text-2xl font-bold">{heading}</h2>
          {subtitle && <div className="text-lg">{subtitle}</div>}
        </div>
      )
    case "Text":
      const className = 'bg-cream p-10 lg:p-16 rounded-md flex flex-col gap-4 [&_h2]:text-2xl [&_h2]:uppercase'
      return <RichText data={block.richText} className={className} />
    case 'Banner':
      return <Hero hero={{ title: block.title, media: block.media }} />
    default:
      return <div className="text-center py-5 font-bold">{block.__typename}...</div>
  }
}