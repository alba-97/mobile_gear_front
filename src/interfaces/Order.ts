import { ProductResponse } from "./Product";
import { UserResponse } from "./UserResponse";

export interface OrderResponse {
  id: number;
  qty: number;
  product: ProductResponse;
  user: UserResponse;
  createdAt: string;
}
