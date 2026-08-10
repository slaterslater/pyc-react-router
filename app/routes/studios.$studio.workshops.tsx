import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { STUDIO_WORKSHOP_QUERY } from "~/graphql/queries/studioWorkshopQuery";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { studio } = params;
  const data = await payload.request(STUDIO_WORKSHOP_QUERY, { studio })
  const workshops = data.Studios.docs[0].workshops.docs[0]?.workshops;
  const offerings = data.Studios.docs[0].offerings.docs[0]?.offerings;
  return { workshops, offerings };
}

export default function StudioWorkshops() {
  return (
    <>
      <Workshops />
      <Offerings />
    </>
  )
}

function Workshops() {
  const { workshops } = useLoaderData<typeof loader>();
  if (!workshops) return null;
  return (
    <>
      <h2 className="heading text-center">Workshops</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {workshops?.map((workshop: Workshop) => <Workshop key={workshop.id} workshop={workshop} />)}
      </section>
    </>
  )
}

function Offerings() {
  const { offerings } = useLoaderData<typeof loader>();
  if (!offerings) return null;
  return (
    <>
      <h2 className="heading text-center">Classes</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {offerings?.map((offering: Offering) => <Offering key={offering.id} offering={offering} />)}
      </section>
    </>
  )
}


function Workshop({ workshop }: { workshop: Workshop }) {
  return (
    <div key={workshop.id}>
      <h3>{workshop.title}</h3>
    </div>
  )
}

function Offering({ offering }: { offering: Offering }) {
  return (
    <div key={offering.id}>
      <h3>{offering.title}</h3>
    </div>
  )
}

type Workshop = {
  id: string;
  title: string;
}

type Offering = {
  id: string;
  title: string;
}