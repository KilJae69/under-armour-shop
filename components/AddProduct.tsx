"use client";

import { useState } from "react";

type AddProductProps = {
  productId?: string;
  variantId?: string;
  stockNumber: number;
};


export default function AddProduct({productId,variantId,stockNumber}: AddProductProps) {
  const [quantity, setQuantity] = useState(1);


const handleQuantity = (type: "inc" | "dec")=> {
    if (type === "dec" && quantity > 1) setQuantity(prev => prev - 1);

    if (type === "inc" && quantity < stockNumber) setQuantity(prev => prev + 1);

}


  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex w-32 items-center justify-between rounded-3xl bg-gray-100 px-4 py-2">
            <button className="cursor-pointer text-xl" onClick={()=>handleQuantity("dec")}>
              -
            </button>
            {quantity}
            <button className="cursor-pointer text-xl" onClick={()=>handleQuantity("inc")}>
              +
            </button>
          </div>
          <div className="text-xs">
            Only <span className="text-orange-500">{stockNumber} items</span> left! <br />{" "}
            Don&apos;t miss it
          </div>
        </div>
        <button className="w-36 rounded-3xl px-4 py-2 text-sm text-primary ring-1 ring-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-0">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
