// dataTypes/Category.ts
export interface Category {
  _id?: string; // Database object Id
  name: string;
  description: string;
  image: string;
  createdAt?: string; // timestamps from backend
  updatedAt?: string;
}
