"use client";

import { useWixClient } from "@/context/wixContext";
import { useCartStore } from "@/hooks/useCartStore";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";

type AddProductProps = {
  productId?: string;
  variantId?: string;
  stockNumber: number;
  disabled?: boolean;
};

export default function AddProduct({
  productId,
  variantId,
  stockNumber,
  disabled
}: AddProductProps) {
  const wixClient = useWixClient();
  const [quantity, setQuantity] = useState(1);
  const { addItem, isLoading } = useCartStore();

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);

    if (type === "inc" && quantity < stockNumber)
      setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex w-32 items-center justify-between rounded-3xl bg-gray-100 px-4 py-2">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("dec")}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("inc")}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">
              Out of stock <br /> Sorry!
            </div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left! <br /> Don&apos;t miss it
            </div>
          )}
        </div>
        <button
          disabled={isLoading || disabled}
          onClick={() => addItem(wixClient, productId!, variantId!, quantity)}
          className="w-36 rounded-3xl px-4 py-2 text-sm text-primary ring-1 ring-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-0"
        >
          {!isLoading ? "Add to Cart" : <SpinnerMini />}
        </button>
      </div>
    </div>
  );
}
