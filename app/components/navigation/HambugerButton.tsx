import { RxHamburgerMenu } from "react-icons/rx"
import { useNavContext } from "./NavProvider"

export function HambugerButton() {
  const { toggleNav } = useNavContext()
  return (
    <button onClick={toggleNav}>
      <RxHamburgerMenu size={42} className="hidden md:block" />
      <RxHamburgerMenu size={32} className="block md:hidden" />
    </button>
  )
}