// dataTypes/User.ts
export interface Address {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  province: string;
  postalCode: string;
  street: string;
}

export interface User {
  _id?: string; // MongoDB ObjectId
  fullname: string;
  email: string;
  phoneno: number;
  password?: string; // usually not sent back to frontend
  address?: Address[];
  createdAt?: string;
  updatedAt?: string;
}
