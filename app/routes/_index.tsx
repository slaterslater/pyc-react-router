import { Link, useLoaderData, useRouteLoaderData, type LoaderFunctionArgs } from "react-router";
import { ButtonRow } from "~/components/ButtonRow";
import { Cards } from "~/components/Cards";
import { Hero } from "~/components/Hero";
import { PageLayout } from "~/components/PageLayout";
import { Review, Reviews } from "~/components/Reviews";
import { SweatDiscoverTransform } from "~/components/SweatDiscoverTransform";
import { HOMEPAGE_QUERY } from "~/graphql/queries/homepageQuery";
import { getSite } from "~/lib/getSite.server";
import { payload } from "~/lib/payloadClient.server";

export function meta() {
  return [
    { title: "dev PYC" },
    { name: "description", content: "development" },
  ];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const site = getSite(request);
  const data = await payload.request(HOMEPAGE_QUERY, { name: site.name });
  return {
    ...data.Sites.docs[0]
  }
}

export default function Home() {
  const data = useLoaderData<typeof loader>()

  console.log({ data })

  return (
    <PageLayout>
      <Hero hero={data.banner1} />
      <SweatDiscoverTransform />
      <Cards cards={data.cards} />
      <Hero hero={data.banner2} parallax={false} />
      <p className="subtitle max-w-5xl mx-auto">Power Yoga Canada operates locally owned hot power yoga studios across Canada, offering consistent heated classes in communities including Toronto, Oakville, Sudbury, Barrie, and beyond.</p>
      <ButtonRow buttons={data.homepageNav} />
      <h2 className="heading text-center uppercase">see what our members say</h2>
      <p className="subtitle">From first-time students to long-time members, Power Yoga Canada<br />studios are built around consistency, encouragement, and shared growth.</p>
      <Reviews reviews={data.reviews} />
      <h2 className="heading text-center uppercase">more than a workout</h2>
      {/* <Hero hero={data.banner3} parallax={false} /> */}
    </PageLayout>
  );
}

