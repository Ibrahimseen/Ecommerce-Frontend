export type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
};

export type Product = {
  _id: string;
  name: string;
  category: string;
  photo: string;
  stock: number;
  price: number;
};

export type shippingInfo = {
  country: string;
  city: string;
  adress: string;
  state: string;
  pinCode: string;
};

export type cartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItem = Omit<cartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: shippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type CountAndChange = {
  revenue: number;
  user: number;
  product: number;
  Order: number;
};

type LatestTransaction = {
  _id: string;
  discount: number;
  amount: number;
  quantity: number;
  status: string;
};

export type stats = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  genderRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTransaction[];
};
