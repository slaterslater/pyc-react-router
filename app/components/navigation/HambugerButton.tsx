import { RxHamburgerMenu } from "react-icons/rx"
import { useNavContext } from "./NavProvider"

export function HambugerButton() {
  const { toggleNav } = useNavContext()
  return (
    <button onClick={toggleNav} aria-label="Open navigation menu" title="Open navigation menu">
      <RxHamburgerMenu size={42} className="hidden md:block" aria-hidden="true" focusable="false" />
      <RxHamburgerMenu size={32} className="block md:hidden" aria-hidden="true" focusable="false" />
    </button>
  )
}