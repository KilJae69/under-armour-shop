import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";

export default function Navbar() {
  return (
    <div className="relative h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex h-full items-center justify-between md:hidden">
        {/* MOBILE */}
        <Link href="/">
          <div className="text-2xl tracking-wide">Under Armour</div>
        </Link>
        <Menu />
      </div>
      {/* DESKTOP */}
      <div className="hidden h-full items-center justify-between gap-8 md:flex">
        {/* LEFT */}
        <div className="flex w-1/3 items-center gap-12 xl:w-1/2">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/under-logo-no-label.png"
              alt="Under Armour Logo"
              width={30}
              height={30}
            />
            <div className="text-2xl tracking-wide">Under Armour</div>
          </Link>
          <div className="hidden gap-4 xl:flex">
            <Link href="/">Homepage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex w-2/3 items-center justify-between gap-8 xl:w-1/2">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
}
