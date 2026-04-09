import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router";
import { Announcements } from "./Announcements";
import { useStudio } from "~/hooks/useStudio";

export function Header() {

  return (
    <header className="w-full">
      <Announcements />
      <div className="w-full py-8 flex items-center justify-between relative min-w-xs max-w-[1450px] mx-auto px-6">
        {/* Hamburger always left */}
        <div className="flex-1 flex items-center">
          <RxHamburgerMenu size={48} />
        </div>
        {/* Title always center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
          <HeaderTitle />
        </div>
        {/* Buttons always right */}
        <HeaderCTAs />
      </div>
    </header>
  )
}

function HeaderTitle() {
  const { isStudioPage, title } = useStudio()

  if (isStudioPage) {
    return (
      <>
        <img src="/pyc-icon.png" alt="power yoga canada logo" width={24} />
        <h1 className="text-2xl font-bold uppercase">{title}</h1>
      </>
    )
  }

  return (
    <>
      <img src="/canada-logo.svg" alt="power yoga canada logo" width={225} />
      <h1 className="sr-only">power yoga canada</h1>
    </>
  )
}

function HeaderCTAs() {
  const { isStudioPage } = useStudio()
  return (
    <div className="flex-1 flex justify-end">
      <div className="hidden lg:flex gap-4">
        <Link to="/" className="btn-red">
          book a class
        </Link>
        {!isStudioPage && (
          <Link to="/" className="btn-red">
            find your studio
          </Link>
        )}
      </div>
    </div>
  )
}