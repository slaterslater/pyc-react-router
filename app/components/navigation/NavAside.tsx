import { NavProvider, useNavContext } from './NavProvider';
import { StudioList } from './StudioList';
import { SiteList } from './SiteList';
import { MenuList } from './MenuList';
import { HambugerButton } from './HambugerButton';
import { IoCloseOutline } from 'react-icons/io5';

export function NavAside() {
  return (
    <NavProvider>
      <HambugerButton />
      <Aside>
        <nav className="flex flex-col gap-4 p-6 h-full bg-black/93">
          <CloseButton />
          <StudioList />
          <MenuList />
          <SiteList />
        </nav>
      </Aside>
    </NavProvider>
  );
}

function CloseButton() {
  const { toggleNav } = useNavContext()
  return (
    <button
      className="text-cream flex justify-end mt-2 cursor-pointer"
      onClick={toggleNav}
      aria-label="Close navigation"
    >
      <IoCloseOutline size={24} />
    </button>
  )
}

function Aside({ children }: { children: React.ReactNode }) {
  const { isNavOpen, toggleNav } = useNavContext()
  return (
    <>
      {/* Overlay outside the clipped container */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleNav}
        />
      )}

      {/* White block covering left gutter */}
      {/* {isNavOpen && (
        <div
          className="fixed top-0 left-0 h-full bg-white z-50"
          style={{
            width: 'max(0px, calc((100vw - 1450px) / 2))',
          }}
        />
      )} */}

      {/* Clipped container constrained to body width */}
      <div
        className="fixed top-0 h-full z-50 overflow-hidden pointer-events-none"
        style={{
          left: 'max(0px, calc((100vw - 1450px) / 2))',
          right: 'max(0px, calc((100vw - 1450px) / 2))',
        }}
      >
        <aside className={`
          pointer-events-auto
          absolute top-0 left-0 h-full w-64 bg-white
          transform transition-transform duration-300 ease-in-out
          ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {children}
        </aside>
      </div>
    </>
  );
}
