import { Link } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Header />
      <main className="flex flex-col items-start justify-center min-w-xs max-w-[1450px] mx-auto px-4">
        {children}
      </main>
      <section className="bg-cream w-full h-[240px]">
        <div className="h-full flex justify-between items-center min-w-xs max-w-[1450px] mx-auto px-8">
          <h2 className="capitalize text-4xl font-medium">start your practice today</h2>
          <div className="flex gap-4">
            <Link to="/" className="btn-black">book a class</Link>
            <Link to="/" className="btn-black">find your studio</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}


