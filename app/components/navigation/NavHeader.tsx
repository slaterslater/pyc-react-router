import { IoChevronBackOutline, IoCloseOutline } from "react-icons/io5";
import { useNavContext } from "./NavProvider"
import { useSite } from "~/hooks/useSite";
import { Link } from "react-router";

export function NavHeader() {
  return (
    <div className="flex justify-end items-center py-3">
      <GroupTitle />
      <CloseButton />
    </div>
  )
}

function CloseButton() {
  const { closeNav } = useNavContext()
  return (
    <button
      className="text-cream flex justify-end cursor-pointer"
      onClick={closeNav}
      aria-label="Close navigation"
    >
      <IoCloseOutline size={24} />
    </button>
  )
}

export function GroupTitle() {
  const { group, goRoot } = useNavContext();
  // const { site } = useSite();

  if (!group) return (null
    // <h2 className="text-md font-semibold text-cream">
    //   {/* <Link to="/">Power Yoga {site?.name}</Link> */}
    //   Power Yoga {site?.name}
    // </h2>
  );

  return (
    <>
      <button className="text-cream cursor-pointer" onClick={goRoot} aria-label="Go to main menu">
        <IoChevronBackOutline size={20} />
      </button>
      <h2 className="text-md font-semibold text-cream mx-auto">
        {group.text}
      </h2>
    </>
  )
}