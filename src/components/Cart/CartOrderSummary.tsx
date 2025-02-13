import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, VStack, Divider, useToast } from "@chakra-ui/react";
import { RootState } from "@/state/store";
import { ICart } from "@/interfaces/Cart";
import { axiosURL } from "@/settings";
import getHeaders from "@/hooks/getHeaders";
import {
  checkoutRequest,
  checkoutFailure,
} from "@/state/checkout/checkoutSlice";

export const CartOrderSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const items = useSelector((state: RootState) => state.cart.items);
  const deliveryAmount = 1000;

  const subtotal = items.reduce((total: number, item: ICart) => {
    return total + item.price * item.qty;
  }, 0);

  const handleCheckout = async () => {
    try {
      dispatch(checkoutRequest());
      const { data } = await axios.post<{ clientSecret: string }>(
        `${axiosURL}/orders/payment-intents`,
        getHeaders()
      );
      navigate("/payment", { state: { clientSecret: data.clientSecret } });
    } catch (error) {
      if (isAxiosError(error)) {
        dispatch(checkoutFailure(error.message));
        toast({
          title: "Checkout failed",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <VStack spacing={4} align="stretch" width="full">
      <Text fontWeight="bold">Order Summary</Text>
      <VStack spacing={2} width="full">
        {items.map((item: ICart) => (
          <Text key={item.id}>
            {item.name} x {item.qty} - ${item.price * item.qty}
          </Text>
        ))}
      </VStack>
      <Divider />
      <Text>Subtotal: ${subtotal}</Text>
      <Text>Delivery: ${deliveryAmount}</Text>
      <Text fontWeight="bold">Total: ${subtotal + deliveryAmount}</Text>
      <Button
        colorScheme="blue"
        width="full"
        onClick={handleCheckout}
        isDisabled={items.length === 0}
      >
        Proceed to Checkout
      </Button>
    </VStack>
  );
};
