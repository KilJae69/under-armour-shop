import Link from "next/link";
import Menu from "./Menu";

import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import Logo from "./Logo";
import { navbarLinks } from "@/constants";
// import NavIcons from "./NavIcons";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 h-nav-height w-full  bg-white/80  px-4 shadow-lg shadow-black/10 backdrop-blur-[0.5rem] md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex h-full items-center justify-between md:hidden">
        {/* MOBILE */}
        <Logo />
        <NavIcons />
        <Menu />
      </div>
      {/* DESKTOP */}
      <div className=" hidden h-full items-center justify-between gap-6 md:flex">
        {/* LEFT */}
        <div className="flex items-center gap-12 ">
          <Logo />
          <nav className="hidden flex-1 md:flex">
            <ul className="flex gap-4">
              {navbarLinks.map((link) => (
                <li key={link.id}>
                  <Link className="transition-colors hover:text-primary" href={link.href}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* RIGHT */}
        <div className="flex  items-center justify-between gap-8 xl:w-1/2">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </header>
  );
}
