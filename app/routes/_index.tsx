import { Link } from "react-router";
import { Card } from "~/components/Card";
import { Hero } from "~/components/Hero";
import { PageLayout } from "~/components/PageLayout";
import { Review } from "~/components/Review";

export function meta() {
  return [
    { title: "dev PYC" },
    { name: "description", content: "development" },
  ];
}

export default function Home() {
  return (
    <PageLayout>
      <Hero title="canada's home for hot power yoga" />
      <h2 className="mx-auto text-4xl tracking-wide uppercase p-4 pt-12 font-light">sweat | discover | transform</h2>
      <p className="mx-auto text-center text-light-gray max-w-6xl leading-relaxed text-2xl font-medium px-4 py-8">Power Yoga Canada is your home for hot power yoga.<br />Our locally operated studios deliver heated classes that build strength, flexibility, and resilience, while fostering connection, consistency, and community across every location.</p>
      <Hero title="find hot power yoga studios across canada" bgColor="cream" textColor="charcoal" />
      <p className="mx-auto text-center text-light-gray leading-relaxed text-2xl font-medium px-4 py-8">Power Yoga Canada operates locally owned hot power yoga studios across Canada, offering consistent heated classes in communities including Toronto, Oakville, Sudbury, Barrie, and beyond.</p>
      <div className="flex gap-6 justify-around w-full p-8">
        <Link to="/" className="btn-black flex-1">book a class</Link>
        <Link to="/" className="btn-black flex-1">find your studio</Link>
        <Link to="/" className="btn-black flex-1">book a class</Link>
        <Link to="/" className="btn-black flex-1">find your studio</Link>
      </div>
      <h2 className="uppercase text-4xl font-medium mx-auto px-4 py-8">see what our memebers say</h2>
      <p className="mx-auto text-center text-light-gray max-w-5xl leading-relaxed text-2xl font-medium px-4">From first-time students to long-time members, Power Yoga Canada
        studios are built around consistency, encouragement, and shared growth.</p>
      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 p-4 pt-10">
        <Review />
        <Review />
        <Review />
      </div>
      <h2 className="uppercase text-4xl font-medium mx-auto px-4 py-8">More Than a Workout</h2>
      <div className="flex gap-4 px-8 py-4 w-full justify-center">
        <Card title="Retreats" text="Immersive retreats designed to deepen practice, restore balance, and strengthen connection beyond the studio." />
        <Card title="30 Day Level Up" text="Beyond our heated power yoga classes, Power Yoga Canada offers immersive experiences designed to deepen your practice and build lasting community." />
      </div>
      <Hero title="practice anywhere. transform everywhere." />
      <h2 className="uppercase text-4xl font-medium mx-auto px-4 py-8">New to Power Yoga Canada?</h2>
      <p className="mx-auto text-center text-light-gray max-w-5xl leading-relaxed text-2xl font-medium px-4">Get started with our 30 Days Unlimited Yoga Intro Special available at every studio. Find the flexible class passes or membership to power your practice</p>
      <Link to="/" className="btn-red mx-auto my-8">view intro offers</Link>
    </PageLayout>
  );
}
