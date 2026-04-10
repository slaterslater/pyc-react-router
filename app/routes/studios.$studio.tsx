import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Hero } from "~/components/Hero";
import { MindBodySchedule } from "~/components/MindBodySchedule";
import { PageLayout } from "~/components/PageLayout";

export function meta() {
  return [
    { title: "studio page | dev PYC" },
    { name: "description", content: "studio page" },
  ];
}

export function loader({ params }: LoaderFunctionArgs) {
  return {
    title: params.studio,
    scheduleId: "254432542c3",
  }
}

export default function StudioRoute() {
  const { scheduleId } = useLoaderData<typeof loader>()

  return (
    <PageLayout>
      <Hero title="main banner or video" />
      <div className="flex gap-6 justify-around w-full p-8">
        <Link to="/" className="btn-black flex-1">schedule</Link>
        <Link to="/" className="btn-black flex-1">workshops</Link>
        <Link to="/" className="btn-black flex-1">pricing</Link>
        <Link to="/" className="btn-black flex-1">about the studio</Link>
      </div>
      <p className="mx-auto text-center text-light-gray max-w-5xl leading-relaxed text-2xl font-medium px-4">Power Yoga Collective is your home for hot power yoga. Our locally operated studios deliver heated classes that build strength, flexibility, and resilience, while fostering connection, consistency, and community across every location.</p>
      <MindBodySchedule scheduleId={scheduleId} />
      <h2 className="uppercase text-4xl font-medium mx-auto px-4 py-8">studio amenities</h2>
      <div className="flex flex-wrap gap-8 px-8 py-4 w-full justify-center md:justify-around">
        <img src="/development/towels.svg" alt="towels" width={135} />
        <img src="/development/hot-yoga.svg" alt="hot yoga" width={135} />
        <img src="/development/showers.svg" alt="showers" width={135} />
        <img src="/development/power-yoga.svg" alt="warm yoga" width={135} />
        <img src="/development/mat-rental.svg" alt="mat rental" width={135} />
      </div>
      <div className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-charcoal mt-7">
        <h2 className="text-white text-center uppercase text-xl font-medium py-6 m-0">
          our community
        </h2>
      </div>
      <p className="mx-auto text-center text-light-gray max-w-5xl leading-relaxed text-2xl font-medium px-4 py-7">Power Yoga Collective is your home for hot power yoga. Our locally operated studios deliver heated classes that build strength, flexibility, and resilience, while fostering connection, consistency, and community across every location.</p>
      <Hero title="main banner or video" />
    </PageLayout>
  )
}