import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../state/orders/ordersActions";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { RootState } from "@/state/store";
import { OrderResponse } from "@/interfaces/OrderResponse";
import { setError, setLoading, setOrders } from "@/state/orders/ordersSlice";
import { isAxiosError } from "axios";

export const SalesDashboard = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const data = await fetchOrders();
      dispatch(setOrders(data));
    } catch (error) {
      if (isAxiosError(error)) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Buyer</Th>
            <Th>Paid</Th>
          </Tr>
        </Thead>

        <Tbody>
          {orders.map((order: OrderResponse) => {
            return (
              <Tr>
                <Td>{order.id}</Td>
                <Td>{order.product.name}</Td>
                <Td>{order.qty}</Td>
                <Td>{order.user.email}</Td>
                <Td>${(order.product.price ?? 0) * order.qty}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};
