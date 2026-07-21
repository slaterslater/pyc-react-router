import { useSite } from "~/hooks/useSite";
import { MenuList } from "./MenuList";
import { useNavContext } from "./NavProvider";
import { StudioList } from "./StudioList";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router";
import { NavLink } from "./NavLink";

export function NavGroups() {
  const { group } = useNavContext();
  if (!group) return <RootGroup />;
  // return <div className="text-md font-semibold text-cream flex justify-between items-center cursor-pointer">NavGroup...</div>;
  return group.links?.map((link) => <NavLink key={link.id} link={link} />)
}

function RootGroup() {
  return (
    <>
      <StudioList />
      <MenuList />
    </>
  )
}

export function GroupTitle() {
  const { group, goRoot } = useNavContext();
  const { site } = useSite();

  console.log({ group })

  if (!group) return (
    <h2 className="text-md font-semibold text-cream">
      <Link to="/">Power Yoga {site?.name}</Link>
    </h2>
  );

  return (
    <>
      <button className="text-cream cursor-pointer" onClick={goRoot} aria-label="Go to main menu">
        <IoChevronBackOutline size={20} />
      </button>
      <h2 className="text-md font-semibold text-cream">
        {group.text}
      </h2>
    </>
  )
}