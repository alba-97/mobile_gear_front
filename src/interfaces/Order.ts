import { Product } from "./Product";
import { User } from "./User";

export interface Order {
  id: number;
  qty: number;
  product: Product;
  user: User;
  createdAt: string;
}
