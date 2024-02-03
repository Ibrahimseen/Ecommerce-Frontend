import { User, cartItem, shippingInfo } from "./types";

export interface UserreducerinitialState {
  user: User | null;
  loading: boolean;
}

export interface CartreducerinitialState {
  loading: boolean;
  cartItems: cartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: shippingInfo;
}
