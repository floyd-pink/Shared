// dataTypes/DummyProducts.ts
import { Product } from "./Product";

export const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Silk Saree",
    price: 2500,
    category: "Saree",
    stock: 7,
    image: "https://via.placeholder.com/240x200?text=Saree"
  },
  {
    id: 2,
    name: "Cotton Kurtha",
    price: 1200,
    category: "Kurtha",
    stock: 0,
    image: "https://via.placeholder.com/240x200?text=Kurtha"
  },
  {
    id: 3,
    name: "Leggings",
    price: 500,
    category: "Leggings",
    stock: 15,
    image: "https://via.placeholder.com/240x200?text=Leggings"
  }
];
