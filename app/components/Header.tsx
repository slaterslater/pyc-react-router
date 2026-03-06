import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router";
import { Announcements } from "./Announcements";

export function Header() {
  return (
    <header className="w-full">
      <Announcements />
      <div className="w-full py-8 flex items-center justify-between relative min-w-xs max-w-[1450px] mx-auto px-6">
        {/* Hamburger always left */}
        <div className="flex-1 flex items-center">
          <RxHamburgerMenu size={48} />
        </div>
        {/* Image always center (absolute positioning) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
          <img src="/canada-logo.svg" alt="power yoga canada logo" width={225} />
        </div>
        {/* Buttons always right */}
        <div className="flex-1 flex justify-end">
          <div className="hidden lg:flex gap-4">
            <Link to="/" className="btn-red">
              book a class
            </Link>
            <Link to="/" className="btn-red">
              find your studio
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}