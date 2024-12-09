import { ProductResponse } from "./Product";
import { UserResponse } from "./User";

export interface OrderResponse {
  id: number;
  qty: number;
  product: ProductResponse;
  user: UserResponse;
  createdAt: string;
}
