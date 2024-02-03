import { Order, Product, User, cartItem, shippingInfo, stats } from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type AllUserResponse = {
  success: boolean;
  users: User[];
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type allproductsResponse = {
  success: boolean;
  products: Product[];
};

export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchProductsResponse = allproductsResponse & {
  totalPage: number;
};

export type productsResponse = {
  success: boolean;
  product: Product;
};

export type AllOrderResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type StatsResponse = {
  success: boolean;
  stats: stats;
};
export type PieResponse = {
  success: boolean;
  stats: stats;
};


export type updateproductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};

export type deleteproductRequest = {
  userId: string;
  productId: string;
};

export type deleteUserRequest = {
  userId: string;
  adminUserId: string;
};

export type newOrderrequest = {
  shippingInfo: shippingInfo;
  orderItems: cartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};


export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};
