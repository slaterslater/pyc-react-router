import { Link } from "react-router";
import { Announcements } from "~/components/Announcements";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

export function meta() {
  return [
    { title: "dev PYC" },
    { name: "description", content: "development" },
  ];
}

export default function Home() {
  return (
    <>
      <Announcements />
      <main className="flex flex-col items-start justify-center min-w-xs max-w-[1450px] mx-auto px-4">
        <Header />
        <h1 className="sr-only">power yoga canada</h1>
        <div className="flex justify-center items-center uppercase font-bold text-lg text-background bg-light-gray rounded-md p-4 w-full h-[575px] md:h-[650px]">canada's home for hot power yoga</div>
        <h2 className="mx-auto text-2xl tracking-wide uppercase py-6 font-light">sweat | discover | transform</h2>
        <p className="mx-auto text-center text-light-gray max-w-3xl leading-relaxed">Power Yoga Canada is your home for hot power yoga.<br />Our locally operated studios deliver heated classes that build strength, flexibility, and resilience, while fostering connection, consistency, and community across every location.</p>
      </main>
      <div className="flex justify-between items-center bg-cream w-full h-[240px] px-8">
        <h2 className="capitalize text-2xl font-medium">start your practice today</h2>
        <div className="flex gap-4">
          <Link to="/" className="btn-black">book a class</Link>
          <Link to="/" className="btn-black">find your studio</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
