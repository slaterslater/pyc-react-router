export function Aside({ children, isOpen, close }: AsideProps) {
  return (
    <>
      {/* Overlay outside the clipped container */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={close}
        />
      )}

      {/* White block covering left gutter */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 h-full bg-white z-50"
          style={{
            width: 'max(0px, calc((100vw - 1450px) / 2))',
          }}
        />
      )}

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
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {children}
        </aside>
      </div>
    </>
  );
}