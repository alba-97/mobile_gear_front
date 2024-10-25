import { ProductResponse } from "./Product";
import { User } from "./User";

export interface Order {
  id: number;
  qty: number;
  product: ProductResponse;
  user: User;
  createdAt: string;
}
