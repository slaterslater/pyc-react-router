import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import ComingSoon from "~/components/ComingSoon";
import { STUDIO_WORKSHOP_QUERY } from "~/graphql/queries/studioWorkshopQuery";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { studio } = params;
  const data = await payload.request(STUDIO_WORKSHOP_QUERY, { studio })
  const workshops = data.Studios.docs[0].workshops.docs[0].workshopBlocks;
  const offerings = data.Studios.docs[0].offerings.docs[0].offeringBlocks;
  return { workshops, offerings };
}

export default function StudioWorkshops() {
  const { workshops, offerings } = useLoaderData<typeof loader>();
  // console.log({ workshops, offerings })
  return (
    <>
      <ComingSoon title="Workshops" />
      <h2 className="heading text-center">Workshops We Offer</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {workshops.map((workshop: Workshop) => <Workshop key={workshop.id} workshop={workshop} />)}
      </section>
      <h2 className="heading text-center">Classes We Offer</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {offerings.map((offering: Offering) => <Offering key={offering.id} offering={offering} />)}
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