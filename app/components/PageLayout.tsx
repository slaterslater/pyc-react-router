import { Footer } from "./Footer";
import { Header } from "./Header";
import { StartYourPracticeSection } from "./StartYourPractice";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-start justify-center bg-white px-4">
        {children}
      </main>
      <StartYourPracticeSection />
      <Footer />
    </>
  )
}


