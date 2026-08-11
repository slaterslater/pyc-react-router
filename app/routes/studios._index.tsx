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
  return (
    <div key={studio.id} className="bg-cream rounded-md p-4">
      <Link to={`/studios/${studio.slug}`}>
        <h3>{studio.name}</h3>
      </Link>
    </div>
  )
}

type Studio = {
  id: string;
  name: string;
  slug: string;
}