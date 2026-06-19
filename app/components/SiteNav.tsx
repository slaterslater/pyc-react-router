import { RxHamburgerMenu } from 'react-icons/rx';
import { useToggle } from 'usehooks-ts';
import { Aside } from './Aside';
import { Link, useRouteLoaderData } from 'react-router';
import { useSite } from '~/hooks/useSite';

export function SiteNav() {
  const { studios } = useRouteLoaderData('root')
  const [isOpen, toggleMenu] = useToggle(false);
  const { hasStudios } = useSite()

  console.log({ studios })

  return (
    <>
      <button onClick={toggleMenu}>
        <RxHamburgerMenu size={42} />
      </button>

      <Aside isOpen={isOpen} close={toggleMenu}>
        <nav className="space-y-4 px-4 py-6">
          <ul>
            {hasStudios && <li><span className="text-md font-semibold">Studios</span>
              <ul>
                {studios.map((studio) => (
                  <li key={studio.id} onClick={toggleMenu}>
                    <Link to={`/studios/${studio.slug}`}>{studio.name}</Link>
                  </li>
                ))}
              </ul>
            </li>}
          </ul>
        </nav>
      </Aside>
    </>
  );
}
