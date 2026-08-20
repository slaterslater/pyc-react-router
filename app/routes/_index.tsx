import { Link, useLoaderData, useRouteLoaderData, type LoaderFunctionArgs } from "react-router";
import { Cards } from "~/components/Cards";
import { Hero } from "~/components/Hero";
import { PageLayout } from "~/components/PageLayout";
import { Review } from "~/components/Reviews";
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
  // const { banner1 } = useLoadeData<typeof loader>()

  console.log({ data })

  return (
    <PageLayout>
      <Hero hero={data.banner1} />
      <SweatDiscoverTransform />
      <Cards cards={data.cards} />
      <Hero hero={data.banner2} parallax={false} />
    </PageLayout>
  );
}

