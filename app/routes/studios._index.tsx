import { Link, useLoaderData, useRouteLoaderData, type LoaderFunctionArgs } from "react-router";
import Contact from "~/components/Contact";
import SEO from "~/components/SEO";
import { ALL_STUDIOS_QUERY } from "~/graphql/queries/allStudiosQuery";
import { getSite } from "~/lib/getSite.server";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const site = getSite(request);
  const data = await payload.request(ALL_STUDIOS_QUERY, { id: site.id });
  const studios = data.Studios.docs;
  return {
    studios,
  }
}

export default function StudiosIndexRoute() {
  const data = useLoaderData<typeof loader>()
  const hasStudios = data.studios.length > 0;

  const { sites, port } = useRouteLoaderData('root')
  const portString = port ? `:${port}` : '';

  const anchorClass = 'flex items-center gap-5 text-2xl px-6 md:justify-center py-4 md:py-16 [&_span]:underline';

  return (
    <>
      <SEO title="Studios" />
      <div className="w-full">
        <div className="flex flex-col items-center justify-center gap-4 px-4 bg-charcoal text-white w-full h-[390px] md:h-[500px] rounded-md text-center">
          <h1 className="heading text-white uppercase">contact us</h1>
          <p>For general questions about PYC please email us at <a className="underline" href="mailto:info@poweryogacanada.com">info@poweryogacanada.com</a></p>
        </div>
      </div>
      <section className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
        {hasStudios && data.studios.map((studio: Studio) => <Studio key={studio.id} studio={studio} />)}
        {!hasStudios && (
          <>
            <a href={`//${sites.canada}${portString}/studios`} className={anchorClass}><img src="/flags/CA.svg" alt="power yoga Canada" width={64} className="rounded-xs" /><span>Power Yoga Canada</span></a>
            <a href={`//${sites.usa}${portString}/studios`} className={anchorClass}><img src="/flags/US.svg" alt="power yoga USA" width={64} className="rounded-xs" /><span>Power Yoga USA</span></a>
          </>
        )}
      </section>
    </>
  )
}

function Studio({ studio }: { studio: Studio }) {
  const studioName = studio.name.toUpperCase().startsWith('PYC') ?
    studio.name :
    `PYC - ${studio.name}`;

  return (
    <div key={studio.id} className="bg-cream rounded-md p-8 md:p-10 lg:p-12 flex flex-col gap-6">
      <Link to={`/studios/${studio.slug}`} className="underline">
        <h3 className="text-xl uppercase">{studioName}</h3>
      </Link>
      <Contact studio={studio} />
      <Link
        to={`/studios/${studio.slug}`}
        className="border border-black rounded-md px-2 py-1 flex items-center gap-2 w-fit uppercase"
        style={{
          backgroundImage: 'url(/pyc-icon.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '8px center',
          backgroundSize: '16px 16px',
          paddingLeft: '32px'
        }}
      >
        {studioName}
      </Link>

    </div>
  )
}

export type Studio = {
  id: string;
  name: string;
  slug: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  state: string;
  zip: string;
  postalCode: string;
  phone: string;
  email: string;
}