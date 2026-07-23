import { useNavContext } from './NavProvider';
import { useEscapeToClose } from '~/hooks/useEscapeToClose';
import { useScrollLock } from 'usehooks-ts';
import { useEffect } from 'react';
import { SiteList } from './SiteList';
import { AnimatePresence, motion } from 'framer-motion';
import { RootMenu } from './RootMenu';
import { NavHeader } from './NavHeader';
import { NavLink } from './NavLink';

const OFFSET = 20;

export function NavAside() {
  const { group } = useNavContext();
  return (
    <Aside>
      <nav className="relative overflow-hidden flex flex-col h-full">
        <NavHeader />
        <div className="relative overflow-y-scroll">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={group?.id || 'root'}
              initial={{ x: group ? OFFSET : -OFFSET, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: group ? -OFFSET : OFFSET, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              {group && group?.links?.map((link) => <NavLink key={link.id} link={link} />)}
              {!group && <RootMenu />}
            </motion.div>
          </AnimatePresence>
        </div>
        <SiteList />
      </nav>
    </Aside>
  );
}

function Aside({ children }: { children: React.ReactNode }) {
  const { isNavOpen, closeNav } = useNavContext()
  useEscapeToClose(isNavOpen, closeNav);

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
          onClick={closeNav}
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
          pointer-events-auto p-6 pt-3 sm:pt-6
          absolute top-0 left-0 h-full w-full md:w-sm
          transform transition-transform duration-300 ease-in-out bg-[#1E1E1E] text-cream
           overflow-y-auto overscroll-contain
          ${isNavOpen ? 'translate-x-0' : '-translate-x-[calc(100%+2px)]'}
        `}>
          {children}
        </aside>
      </div>
    </>
  );
}
