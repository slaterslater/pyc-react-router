import dayjs from "dayjs";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link, useRouteLoaderData } from "react-router";

export function Footer() {
  const { footer } = useRouteLoaderData('root')

  return (
    <footer className="w-full min-w-xs max-w-[1450px] mx-auto px-4 flex flex-col sm:flex-row flex-wrap py-8 gap-8">
      <div className="flex flex-col gap-5 items-center justify-between w-fit mx-auto px-8 order-1">
        {/* <div className="flex flex-col items-center justify-between min-h-[150px] px-8 order-1"> */}
        <Link to="/">
          <img src="/canada-logo.svg" alt="power yoga canada logo" width={150} />
        </Link>
        <div className="flex items-center gap-6 text-light-gray">
          <FaFacebook size={25} />
          <FaLinkedin size={25} />
          <FaYoutube size={25} />
          <FaInstagram size={25} />
        </div>
      </div>
      <nav className="grid grid-cols-1 sm:grid-cols-3 gap-8 order-0 sm:order-2 max-w-[700px] mx-auto flex-1">
        {footer.map(({ id, title, links }: { id: string, title: string, links: { text: string, url: string }[] }) => (
          <div key={id}>
            <h3 className="font-bold mb-3">{title}</h3>
            <ul className="space-y-3">
              {links.map(({ text }, index: number) => (
                <li key={index}>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <p className="w-full basis-full mt-4 text-center text-sm uppercase order-3">{`© ${dayjs().year()} Power Yoga Canada`}</p>
    </footer>
  )
}