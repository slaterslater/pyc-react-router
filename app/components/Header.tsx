import { Link } from "react-router";
import { Announcements } from "./Announcements";
import { useStudio } from "~/hooks/useStudio";
import { NavAside } from "./navigation/NavAside";
import { MindbodyLink } from "./MindbodyLink";
import { NavProvider } from "./navigation/NavProvider";
import { HambugerButton } from "./navigation/HambugerButton";
import { useSite } from "~/hooks/useSite";
import { usePage } from "~/hooks/usePage";

export function Header() {

  return (
    <header className="w-full bg-charcoal">
      <Announcements />
      <div className="relative flex items-center justify-center w-full px-4 py-6 min-w-xs max-w-[1450px] mx-auto h-[80px] rounded-t-lg bg-white">
        <div className="absolute left-4">
          <NavProvider>
            <HambugerButton />
            <NavAside />
          </NavProvider>
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
  const { isStudioPage, name, studioLink } = useStudio()
  const { title } = usePage()
  const { site, logoSrc } = useSite()

  if (isStudioPage) {
    return (
      <>
        <h1 className={`heading uppercase ${name.length > 15 ? 'text-xl' : 'text-2xl'}`}>
          <Link to={studioLink} className="flex items-center gap-2">
            <img src="/pyc-icon.png" alt="" width={24} />
            {name}
          </Link>
        </h1>
      </>
    )
  }

  return (
    <>
      <img src={logoSrc} alt="logo" width={225} className="w-[130px] md:w-[225px]" />
      <h1 className="sr-only">{title ?? `Power Yoga ${site.name}`}</h1>
    </>
  )
}

function HeaderCTAs() {
  const { isStudioPage } = useStudio()
  return (
    <div className="flex-1 flex justify-end">
      <div className="hidden lg:flex gap-4">
        <LoginLink />
        {!isStudioPage && (
          <Link to="/studios" className="button btn-red uppercase">
            find your studio
          </Link>
        )}
      </div>
    </div>
  )
}

function LoginLink() {
  const { loginLink } = useStudio()
  if (!loginLink) return null

  return (
    <MindbodyLink html={loginLink} className="button btn-red uppercase h-[42px]">
      book a class
    </MindbodyLink>
  )
}