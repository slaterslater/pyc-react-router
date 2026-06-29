import { RxHamburgerMenu } from 'react-icons/rx';
import { useToggle } from 'usehooks-ts';
import { Aside } from './Aside';
import { Link, useRouteLoaderData } from 'react-router';
import { useSite } from '~/hooks/useSite';

export function SiteNav() {
  const { studios, sites, port, menu } = useRouteLoaderData('root')
  const [isOpen, toggleMenu] = useToggle(false);
  const { hasStudios } = useSite()
  const portString = port ? `:${port}` : '';

  // console.log({ studios })
  console.log({ menu })
  return (
    <>
      <button onClick={toggleMenu}>
        <RxHamburgerMenu size={42} />
      </button>

      <Aside isOpen={isOpen} close={toggleMenu}>
        <nav className="space-y-4 px-4 py-6">
          <ul className="flex items-center gap-4">
            <li><a href={`//${sites.collective}${portString}`}><img src="/pyc-icon.png" alt="power yoga Collective" width={40} /></a></li>
            <li><a href={`//${sites.canada}${portString}`}><img src="/flags/CA.svg" alt="power yoga Canada" width={50} /></a></li>
            <li><a href={`//${sites.usa}${portString}`}><img src="/flags/US.svg" alt="power yoga USA" width={50} /></a></li>
          </ul>
          <ul>
            {hasStudios && <li><span className="text-md font-semibold">Studios</span>
              <ul>
                {studios.map((studio: StudioLink) => (
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

type StudioLink = {
  id: string;
  name: string;
  slug: string;
}
