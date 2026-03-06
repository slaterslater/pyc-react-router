import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router";

export function Header() {
  return (
    <header className="w-full py-8 flex items-center justify-between relative">
      {/* Hamburger always left */}
      <div className="flex-1 flex items-center">
        <RxHamburgerMenu size={32} />
      </div>
      {/* Image always center (absolute positioning) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
        <img src="/canada-logo.svg" alt="power yoga canada logo" width={225} />
      </div>
      {/* Buttons always right */}
      <div className="flex-1 flex justify-end">
        <div className="hidden lg:flex gap-2">
          <Link to="/" className="btn-red">
            book a class
          </Link>
          <Link to="/" className="btn-red">
            find your studio
          </Link>
        </div>
      </div>
    </header>
  )
}