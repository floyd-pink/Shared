// dataTypes/Order.ts
export interface OrderItem {
  product: string;   // Product._id
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  province: string;
  postalCode: string;
  street: string;
}

export interface Order {
  _id?: string;
  user: string; // User._id
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  payment: string; // Payment._id
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt?: string;
  updatedAt?: string;
}
