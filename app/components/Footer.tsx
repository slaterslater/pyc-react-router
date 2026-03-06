import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full py-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <img src="/canada-logo.svg" alt="power yoga canada logo" width={150} />
        <div className="flex items-center gap-4 text-light-gray">
          <FaFacebook size={25} />
          <FaLinkedin size={25} />
          <FaYoutube size={25} />
          <FaInstagram size={25} />
        </div>
      </div>
      <nav className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
        <div>
          <h3 className="font-bold mb-3">Topic</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Page</a></li>
            <li><a href="#" className="hover:underline">Page</a></li>
            <li><a href="#" className="hover:underline">Page</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Topic</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Page</a></li>
            <li><a href="#" className="hover:underline">Page</a></li>
            <li><a href="#" className="hover:underline">Page</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Topic</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Page</a></li>
            <li><a href="#" className="hover:underline">Page</a></li>
            <li><a href="#" className="hover:underline">Page</a></li>
          </ul>
        </div>
      </nav>
    </footer>
  )
}