import { currentCart } from "@wix/ecom";
interface LineItem {
  _id: string;
  image?: string | null;
  productName?: {
    original: string | null;
  } | null;
  quantity?: number | null;
  price?: {
    amount: number | null;
  } | null;
  availability?: {
    status: string | null;
  } | null;
}

// Extend or redefine the Cart type to include subtotal
export interface CustomCart extends Omit<currentCart.Cart, 'lineItems'> {
  lineItems: LineItem[];
  subtotal?: {
    amount: number;
  };
}