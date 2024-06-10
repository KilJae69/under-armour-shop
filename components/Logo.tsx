import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/under-logo-no-label.png"
        alt="Under Armour Logo"
        width={30}
        height={30}
      />
      <div className="hidden whitespace-nowrap text-2xl tracking-wide md:block">
        Under
      </div>
    </Link>
  );
}
