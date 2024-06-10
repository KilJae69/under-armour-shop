"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/context/wixContext";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import SpinnerMini from "./SpinnerMini";

export default function NavIcons() {
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wixClient = useWixClient();
  const { counter, getCart } = useCartStore();

  const isLoggedIn = wixClient.auth.loggedIn();

  const handleProfile = () => {
    if (!isLoggedIn) router.push("/login");

    setIsCartOpen(false);
    setIsProfileOpen((open) => !open);
  };

  const handleCartModal = () => {
    setIsProfileOpen(false);
    setIsCartOpen((open) => !open);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className=" flex items-center gap-4 xl:gap-6">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer transition-transform hover:scale-105"
        onClick={handleProfile}
      />
      {isProfileOpen && isLoggedIn && (
        <div className="absolute right-1/2 top-nav-height z-20 flex w-60 translate-x-1/2 flex-col items-center rounded-md bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  md:right-8 md:translate-x-0  lg:right-16 xl:right-32 2xl:right-64">
          <Link className="hover:text-primary" href="/profile">
            Profile
          </Link>
          <button
            disabled={isLoading}
            onClick={handleLogout}
            className="mt-2 cursor-pointer hover:text-primary"
          >
            {isLoading ? <SpinnerMini /> : "Logout"}
          </button>
        </div>
      )}
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer transition-transform hover:scale-105"
      />
      <button
        onClick={handleCartModal}
        className="group relative cursor-pointer"
      >
        <Image
          className="transition-transform group-hover:scale-105"
          src="/cart.png"
          alt=""
          width={22}
          height={22}
        />
        <span className="absolute -right-4 -top-4 flex size-6 items-center justify-center rounded-full bg-primary text-sm text-white transition-all group-hover:-top-5">
          {counter}
        </span>
      </button>
      <CartModal isCartOpen={isCartOpen} onClose={setIsCartOpen} />
    </div>
  );
}
