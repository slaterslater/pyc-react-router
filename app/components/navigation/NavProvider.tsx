import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useToggle } from "usehooks-ts";
import type { MenuLink } from "./NavLink";

const NavContext = createContext<{
  isNavOpen: boolean,
  toggleNav: () => void,
  group: MenuGroup | null,
  openGroup: (group: MenuGroup) => void,
  goRoot: () => void,
  setGroup: (group: MenuGroup | null) => void,
}>
  ({
    isNavOpen: false,
    toggleNav: () => { },
    group: null,
    openGroup: () => { },
    goRoot: () => { },
    setGroup: () => { },
  });

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [isNavOpen, toggleNav] = useToggle(false);
  const [group, setGroup] = useState<MenuGroup | null>(null);

  const openGroup = useCallback((group: MenuGroup) => {
    setGroup(group);
  }, []);

  const goRoot = useCallback(() => {
    setGroup(null);
  }, []);

  const value = useMemo(
    () => ({
      isNavOpen,
      toggleNav,
      group,
      openGroup,
      goRoot,
      setGroup,
    }),
    [isNavOpen, toggleNav, group, openGroup, goRoot, setGroup]
  );

  return (
    <NavContext.Provider value={value}>
      {children}
    </NavContext.Provider>
  )
}

export function useNavContext() {
  return useContext(NavContext);
}

export type MenuGroup = {
  id?: string,
  text: string,
  links: MenuLink[],
}