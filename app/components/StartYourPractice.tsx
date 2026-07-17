import { Link } from "react-router"
import { useStudio } from "~/hooks/useStudio"
import { MindbodyLink } from "./MindbodyLink"

export function StartYourPracticeSection() {
  const { isStudioPage, loginLink } = useStudio()

  return (
    <section className="bg-charcoal w-full h-[200px]">
      <div className="h-full flex flex-col sm:flex-row justify-center gap-4 sm:justify-between items-left sm:items-center min-w-xs max-w-[1450px] mx-auto px-8">
        <h2 className="capitalize heading text-white font-medium">start your practice today</h2>
        <div className="flex gap-4 mr-8 w-fit">
          {/* <Link to="/" className="button btn-red uppercase">book a class</Link> */}
          {loginLink && (
            <MindbodyLink html={loginLink} className="button btn-red uppercase h-[42px]">
              book a class
            </MindbodyLink>
          )}
        </div>
      </div>
    </section>
  )
}