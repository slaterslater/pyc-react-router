export function Aside({ children, isOpen, close }: AsideProps) {

  return (
    <>
      {isOpen && <div onClick={close} className="fixed inset-0 bg-black/50 z-40" />}

      <aside className={`
            fixed top-0 left-0 h-full w-64 bg-white z-50
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
        {children}
      </aside>
    </>
  );
}

type AsideProps = {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}
