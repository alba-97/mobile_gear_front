import { useEffect, useState } from "react";
import axios from "axios";
import * as settings from "../settings";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import getHeaders from "../hooks/getHeaders";

export const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const response = await axios.get(
        `${settings.axiosURL}/orders/history`,
        getHeaders
      );
      setHistory(response.data);
    };
    getHistory();
  }, []);

  return (
    <div>
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
          {history.map((order) => {
            return (
              <Tr key={order.id}>
                <Td>{order.product.name}</Td>
                <Td>{order.qty}</Td>
                <Td>${order.product.price * order.qty}</Td>
                <Td>{order.createdAt.slice(0, 10)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};
