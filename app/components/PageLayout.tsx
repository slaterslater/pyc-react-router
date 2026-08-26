import { Footer } from "./Footer";
import { Header } from "./Header";
import { StartYourPracticeSection } from "./StartYourPractice";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 bg-white pb-5 flex-1 px-2 md:px-4">
        {children}
      </main>
      <StartYourPracticeSection />
      <Footer />
    </>
  )
}


