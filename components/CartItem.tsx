import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/context/wixContext";


type CartItemProps = {
    itemId:string,
    itemImg:string | undefined,
    itemName:string | undefined,
    itemPrice:string | undefined,
    itemQuantity:number | undefined,
    itemStatus:string | undefined
}

export default function CartItem({itemId,itemImg,itemName,itemPrice,itemQuantity,itemStatus}:CartItemProps) {
    const { isLoading, removeItem } = useCartStore();
    const wixClient = useWixClient();
  return (
    <div className="flex gap-4" key={itemId}>
                {itemImg && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      itemImg,
                      72,
                      96,
                      {}
                    ) ?? "/placeholder-image.png"}
                    alt={itemName ?? "Product Image"}
                    width={72}
                    height={96}
                    className="rounded-md object-cover"
                  />
                )}
                <div className="flex w-full flex-col justify-between">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {itemName ?? "Unknown Product Name"}
                      </h3>
                      <div className="flex items-center gap-2 rounded-sm bg-gray-50 p-1">
                        {itemQuantity && itemQuantity > 1 && (
                          <div className="text-sm text-green-500">
                            {itemQuantity} x
                          </div>
                        )}
                        ${itemPrice ?? "N/A"}
                      </div>
                    </div>
                    {/* DESCRIPTION */}
                    <div className="text-sm text-gray-500">
                      {itemStatus ?? "Unknown Status"}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {itemQuantity ?? 1}</span>
                    <button
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      className="text-blue-500"
                      onClick={() => removeItem(wixClient, itemId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
  );
  
}