"use client";

import { useCartStore } from "@/hooks/useCartStore";

import CartItem from "./CartItem";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useWixClient } from "@/context/wixContext";
import { useRouter } from "next/navigation";

type CartModalProps = {
  isCartOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

export default function CartModal({ isCartOpen, onClose }: CartModalProps) {
  const wixClient = useWixClient();
  const router = useRouter();
  const { cart, isLoading } = useCartStore();
  const isLoggedIn = wixClient.auth.loggedIn();

  const subtotal = (cart.lineItems || []).reduce((acc, item) => {
    return acc + (Number(item.price?.amount) ?? 0);
  }, 0);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      onClose(false);
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  }

  return (
    <div
      className={`absolute  z-20 flex w-full flex-col gap-6 bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all duration-500 ease-in-out md:w-max
        ${
          isCartOpen
            ? "right-0 top-nav-height opacity-100 md:right-5"
            : "right-0 top-[-1000px] opacity-0 md:right-5"
        }`}
    >
      <Image
        src="/xmark.png"
        alt="Close"
        width={22}
        height={22}
        className="absolute right-5 top-5 cursor-pointer transition-transform hover:scale-105"
        onClick={() => onClose(false)}
      />
      {!cart.lineItems || cart.lineItems.length === 0 ? (
        <div className="flex min-h-[400px] min-w-[300px] flex-col items-center justify-center gap-5">
          <h2 className="text-xl">Shopping cart</h2>
          <p>Your cart is currently empty</p>
          <p>Add products to your cart</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST OF ITEMS */}
          <div className="flex max-h-[500px] flex-col gap-8 overflow-y-auto pr-4">
            {/* ITEM */}
            {cart.lineItems &&
              cart.lineItems
                .filter((item) => item._id)
                .map((item, index) =>
                  item._id ? (
                    <CartItem
                      key={item._id}
                      itemId={item._id}
                      itemPrice={item.price?.amount}
                      itemQuantity={item.quantity}
                      itemName={item.productName?.original}
                      itemImg={item.image}
                      itemStatus={item.availability?.status}
                    />
                  ) : (
                    <div
                      key={item._id || index}
                      className="flex items-center justify-between gap-4 rounded-md bg-gray-100 p-4"
                    >
                      Unfortunately, this item is no longer part of our
                      collection.
                    </div>
                  )
                )}
          </div>
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">${subtotal}</span>
            </div>
            <p className="mb-4 mt-2 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md px-4 py-3 ring-1 ring-gray-300">
                View Cart
              </button>
              <button
              onClick={handleCheckout}
                disabled={isLoading || cart.lineItems.length < 1}
                className="cursor-pointer rounded-md bg-black px-4 py-3 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:ring-0"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
