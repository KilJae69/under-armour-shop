"use client";

import { navbarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((open) => !open)}
      />

      <nav
        className={`absolute z-10 flex h-[calc(50vh-var(--nav-height))] w-full flex-col items-center justify-center gap-8 rounded-b-2xl bg-black text-xl text-white transition-all duration-500 ease-in-out ${
          open
            ? "left-0 top-nav-height opacity-100"
            : "left-0 top-[-2000px] opacity-0"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute left-0 top-0 z-0 h-screen w-full bg-black opacity-75`}
        />
        <ul className="relative z-10 flex flex-col items-center gap-6">
          {navbarLinks.map((link) => (
            <li key={link.id}>
              <Link
                className="text-white transition-colors hover:text-primary"
                href={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
