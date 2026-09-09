import { Link, useLoaderData, useRouteLoaderData, type LoaderFunctionArgs } from "react-router";
import { BlankHero } from "~/components/BlankHero";
import { PageLayout } from "~/components/PageLayout";
import SEO from "~/components/SEO";
import { ALL_STUDIOS_QUERY } from "~/graphql/queries/allStudiosQuery";
import { getSite } from "~/lib/getSite.server";
import { payload } from "~/lib/payloadClient.server";
import type { Studio } from "./studios._index";
import Contact from "~/components/Contact";

export async function loader({ request }: LoaderFunctionArgs) {
  const site = getSite(request);
  const data = await payload.request(ALL_STUDIOS_QUERY, { id: site.id });
  const studios = data.Studios.docs;
  return {
    studios,
  }
}

export default function AllStudiosWorkshopsRoute() {
  const { studios } = useLoaderData<typeof loader>();
  const hasStudios = studios.length > 0;

  return (
    <PageLayout>
      <SEO title="Workshops" description="Check out your local PYC studio for their workshop schedule. Studios run different workshops at different times throughout the year. To reserve your spot, you must pre-register and pay for the workshop. You can do this either online or in person. There is a no refund policy for all workshops and programs. ENROLL NOW CHOOSE" />
      <BlankHero>
        <h1 className="heading text-white uppercase">Workshops</h1>
      </BlankHero>
      <section className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
        {hasStudios && studios.map((studio: Studio) => <Studio key={studio.id} studio={studio} />)}
        {!hasStudios && <NoStudios />}
      </section>
    </PageLayout>
  );
}

function Studio({ studio }: { studio: Studio }) {
  const studioName = studio.name.toUpperCase().startsWith('PYC') ?
    studio.name :
    `PYC - ${studio.name}`;

  return (
    <div key={studio.id} className="bg-cream rounded-md p-8 md:p-10 lg:p-12 flex flex-col gap-6">
      <Link to={`/studios/${studio.slug}/workshops`} className="underline">
        <h3 className="text-xl uppercase">{studioName}</h3>
      </Link>
      <Contact studio={studio} />
      <Link
        to={`/studios/${studio.slug}/workshops`}
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

function NoStudios() {
  const { sites, port } = useRouteLoaderData('root')
  const portString = port ? `:${port}` : '';
  const anchorClass = 'flex items-center gap-5 text-2xl px-6 md:justify-center py-4 md:py-16 [&_span]:underline';

  return (
    <>
      <a href={`//${sites.canada}${portString}/workshops`} className={anchorClass}><img src="/flags/CA.svg" alt="power yoga Canada" width={64} className="rounded-xs" /><span>Power Yoga Canada</span></a>
      <a href={`//${sites.usa}${portString}/workshops`} className={anchorClass}><img src="/flags/US.svg" alt="power yoga USA" width={64} className="rounded-xs" /><span>Power Yoga USA</span></a>
    </>
  )
}