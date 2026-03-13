import { Link } from "react-router"
import { useStudio } from "~/hooks/useStudio"

export function StartYourPracticeSection() {
  const { isStudioPage } = useStudio()

  return (
    <section className="bg-charcoal w-full h-[240px] mt-8">
      <div className="h-full flex justify-between items-center min-w-xs max-w-[1450px] mx-auto px-8">
        <h2 className="capitalize text-4xl text-white font-medium">start your practice today</h2>
        <div className="flex gap-4 mr-8">
          <Link to="/" className="btn-red">book a class</Link>
          {!isStudioPage && (
            <Link to="/" className="btn-red">find your studio</Link>
          )}
        </div>
      </div>
    </section>
  )
}