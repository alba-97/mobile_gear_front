import { useEffect, useState } from "react";
import axios from "axios";
import * as settings from "../settings";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import getHeaders from "../hooks/getHeaders";
import { Order } from "@/interfaces/Order";

export const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const response = await axios.get(
        `${settings.axiosURL}/orders/history`,
        getHeaders()
      );
      setHistory(response.data);
    };
    getHistory();
  }, []);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Product</Th>
          <Th>Quantity</Th>
          <Th>Paid</Th>
          <Th>Date</Th>
        </Tr>
      </Thead>

      <Tbody>
        {history.map((order: Order) => {
          return (
            <Tr key={order.id}>
              <Td>{order.product.name}</Td>
              <Td>{order.qty}</Td>
              <Td>${(order.product.price ?? 0) * order.qty}</Td>
              <Td>{order.createdAt.slice(0, 10)}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
