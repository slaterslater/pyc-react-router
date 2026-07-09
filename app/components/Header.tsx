import { Link } from "react-router";
import { Announcements } from "./Announcements";
import { useStudio } from "~/hooks/useStudio";
import { NavAside } from "./navigation/NavAside";

export function Header() {

  return (
    <header className="w-full bg-white">
      <Announcements />
      <div className="relative flex items-center justify-center w-full px-4 py-6 min-w-xs max-w-[1450px] mx-auto">
        <div className="absolute left-4">
          <NavAside />
        </div>
        <HeaderTitle />
        <div className="absolute right-4 hidden md:flex items-center gap-3">
          <HeaderCTAs />
        </div>
      </div>
    </header>
  )
}

function HeaderTitle() {
  const { isStudioPage, name } = useStudio()

  if (isStudioPage) {
    return (
      <>
        <h1 className={`heading uppercase flex items-center gap-3 ${name.length > 15 ? 'text-xl' : 'text-2xl'}`}>
          <img src="/pyc-icon.png" alt="power yoga canada logo" width={24} />
          {name}
        </h1>
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
        {/* <Link to="/" className="button btn-red uppercase">
          book a class
        </Link> */}
        <LoginLink />
        {!isStudioPage && (
          <Link to="/" className="button btn-red uppercase">
            find your studio
          </Link>
        )}
      </div>
    </div>
  )
}

function LoginLink() {
  const { loginLink } = useStudio()
  return (
    // <Link to={loginLink} className="button btn-red uppercase">
    <Link to="/" className="button btn-red uppercase">
      book a class
    </Link>
  )
}