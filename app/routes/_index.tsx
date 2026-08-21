import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { ButtonRow } from "~/components/ButtonRow";
import { Cards } from "~/components/Cards";
import { HomepageFeature } from "~/components/Feature";
import { Hero } from "~/components/Hero";
import { PageLayout } from "~/components/PageLayout";
import { Reviews } from "~/components/Reviews";
import { SweatDiscoverTransform } from "~/components/SweatDiscoverTransform";
import { HOMEPAGE_QUERY } from "~/graphql/queries/homepageQuery";
import { useSite } from "~/hooks/useSite";
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
  const { site } = useSite()

  return (
    <PageLayout>
      <Hero hero={data.banner1} />
      <SweatDiscoverTransform />
      <p className="subtitle">{data.description1}</p>
      <Cards cards={data.cards} />
      <Hero hero={data.banner2} parallax={false} />
      <p className="subtitle max-w-5xl mx-auto py-3">{data.description2}</p>
      <ButtonRow buttons={data.homepageNav} />
      <h2 className="heading text-center uppercase pt-8">see what our members say</h2>
      <p className="subtitle pb-4">From first-time students to long-time members, Power Yoga Canada<br />studios are built around consistency, encouragement, and shared growth.</p>
      <Reviews reviews={data.reviews} />
      <h2 className="heading text-center uppercase py-4">{data.featureTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HomepageFeature feature={data.feature1} />
        <HomepageFeature feature={data.feature2} />
      </div>
      <Hero hero={data.banner3} parallax={false} />
      <div className="flex flex-col gap-4 p-4 justify-center items-center">
        <h2 className="heading text-center capitalize">New to Power Yoga {site.name}?</h2>
        <p className="subtitle">Get started with our 30 Days Unlimited Yoga Intro Special available at every studio. Find the flexible class passes or membership to power your practice</p>
        <Link to="/studios" className="btn-red w-fit rounded-md px-5 py-3 uppercase text-sm">View Intro Offers</Link>
      </div>
    </PageLayout>
  );
}

