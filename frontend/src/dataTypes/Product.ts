// dataTypes/Product.ts
export interface ProductImage {
  url: string;
  public_id: string;
}

export interface Review {
  user: string; // User._id
  name: string;
  rating: number;
  comment: string;
}

export interface Product {
  _id?: string; // MongoDB ObjectId
  name: string;
  description: string;
  brand: string;
  price: number;
  discount?: number;
  instock: number;
  sold?: number;
  images: ProductImage[];
  category: string; // Category._id
  ratings?: number;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}
