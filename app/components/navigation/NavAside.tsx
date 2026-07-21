import { useNavContext } from './NavProvider';
import { IoCloseOutline } from 'react-icons/io5';
import { GroupTitle, NavGroups } from './NavGroups';
import { useEscapeToClose } from '~/hooks/useEscapeToClose';
import { useScrollLock } from 'usehooks-ts';
import { useEffect } from 'react';
import { useSite } from '~/hooks/useSite';
import { SiteList } from './SiteList';

export function NavAside() {
  return (
    <Aside>
      <nav className="flex flex-col gap-4 h-full">
        <div className="flex justify-between items-cente py-3">
          <GroupTitle />
          <CloseButton />
        </div>
        <NavGroups />
        <SiteList />
      </nav>
    </Aside>
  );
}

function CloseButton() {
  const { toggleNav } = useNavContext()
  return (
    <button
      className="text-cream flex justify-end cursor-pointer"
      onClick={toggleNav}
      aria-label="Close navigation"
    >
      <IoCloseOutline size={24} />
    </button>
  )
}

function Aside({ children }: { children: React.ReactNode }) {
  const { isNavOpen, toggleNav } = useNavContext()
  useEscapeToClose(isNavOpen, toggleNav);

  const { lock, unlock } = useScrollLock({ autoLock: false, lockTarget: "html" })

  useEffect(() => {
    if (!isNavOpen) unlock()
    if (isNavOpen) lock()
  }, [isNavOpen])

  return (
    <>
      {/* Overlay outside the clipped container */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
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
          pointer-events-auto p-6
          absolute top-0 left-0 h-full w-full md:w-sm
          transform transition-transform duration-300 ease-in-out bg-[#1E1E1E] text-cream
          ${isNavOpen ? 'translate-x-0' : '-translate-x-[calc(100%+2px)]'}
        `}>
          {children}
        </aside>
      </div>
    </>
  );
}
