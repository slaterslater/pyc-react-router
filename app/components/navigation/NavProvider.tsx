import { createContext, useContext } from "react";
import { useToggle } from "usehooks-ts";

const NavContext = createContext<{
  isNavOpen: boolean,
  toggleNav: () => void
}>
  ({
    isNavOpen: false,
    toggleNav: () => { }
  });

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [isNavOpen, toggleNav] = useToggle(false);

  return (
    <NavContext.Provider value={{ isNavOpen, toggleNav }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNavContext() {
  return useContext(NavContext);
}