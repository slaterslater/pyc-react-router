import { Footer } from "./Footer";
import { Header } from "./Header";
import { StartYourPracticeSection } from "./StartYourPractice";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 justify-center bg-white">
        {children}
      </main>
      <StartYourPracticeSection />
      <Footer />
    </>
  )
}


