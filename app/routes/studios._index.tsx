import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
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

  return (
    <>
      <div className="w-full px-4">
        <div className="flex flex-col items-center justify-center gap-4 px-4 bg-charcoal text-white w-full h-[390px] md:h-[500px] rounded-md text-center">
          <h1 className="heading text-white uppercase">contact us</h1>
          <p>For general questions about PYC please email us at <a className="underline" href="mailto:info@poweryogacanada.com">info@poweryogacanada.com</a></p>
        </div>
      </div>
      <section className={`grid grid-cols-1 md:grid-cols-2 gap-4 px-4`}>
        {data?.studios.map((studio: Studio) => <Studio key={studio.id} studio={studio} />)}
      </section>
    </>
  )
}

function Studio({ studio }: { studio: Studio }) {
  const studioName = studio.name.toUpperCase().startsWith('PYC') ?
    studio.name :
    `PYC - ${studio.name}`;

  return (
    <div key={studio.id} className="bg-cream rounded-md px-8 py-10 flex flex-col gap-6">
      <Link to={`/studios/${studio.slug}`} className="underline">
        <h3 className="text-xl uppercase">{studioName}</h3>
      </Link>
      <address className="not-italic uppercase">
        <div>{studio.address1} {studio.address2 && `- ${studio.address2}`}</div>
        <div>
          {[studio.city, studio.province || studio.state]
            .filter(Boolean)
            .join(", ")}
        </div>
        <div>{studio.postalCode || studio.zip}</div>
      </address>
      {(studio.phone || studio.email) && <div className="flex flex-col">
        <div>{studio.phone}</div>
        <a href={`mailto:${studio.email}`} className="underline">{studio.email}</a>
      </div>
      }
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

type Studio = {
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