import { Link } from "react-router"
import { useStudio } from "~/hooks/useStudio"
import { MindbodyLink } from "./MindbodyLink"

export function StartYourPracticeSection() {
  const { isStudioPage, loginLink } = useStudio()

  return (
    <section className="bg-charcoal w-full py-12 md:py-16 lg:py-18">
      <div className="h-full flex flex-col sm:flex-row justify-center gap-5 sm:justify-between items-left sm:items-center min-w-xs max-w-[1450px] mx-auto px-8 text-center">
        <h2 className="capitalize heading text-white font-medium">start your practice today</h2>
        {/* <div className="flex gap-4  mr-8 w-fit"> */}
        <div className="flex gap-4 w-fit mx-auto sm:mx-4">
          {loginLink && (
            <MindbodyLink html={loginLink} className="button btn-red uppercase h-[42px]">
              book a class
            </MindbodyLink>
          )}
          {!isStudioPage && (
            <Link to="/studios" className="button btn-red uppercase">
              find your studio
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}