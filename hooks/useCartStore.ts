import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

type CartItem = {
  itemId:string | undefined | null,
  itemImg:string | undefined,
  itemName:string | undefined,
  itemPrice:string | undefined,
  itemQuantity:number | undefined,
  itemStatus:string | undefined
}

type Cart2 = {
  lineItems: CartItem[];
  subtotal?:{
    amount:number;
  
  }
}


type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (err) {
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    set((prev) => ({ ...prev, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length || 0,
      isLoading: false,
    });
  },
  removeItem: async (wixClient,itemId) => {
    set((prev) => ({ ...prev, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);

    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length || 0,
      isLoading: false,
    });
  },
}));
