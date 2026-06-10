import { RxHamburgerMenu } from 'react-icons/rx';
import { useToggle } from 'usehooks-ts';
import { Aside } from './Aside';

export function SiteNav() {
  const [isOpen, toggleMenu] = useToggle(false);

  return (
    <>
      <button onClick={toggleMenu}>
        <RxHamburgerMenu size={42} />
      </button>

      <Aside isOpen={isOpen} close={toggleMenu}>
        <nav>
          <ul>
            nav here
          </ul>
        </nav>
      </Aside>
    </>
  );
}
