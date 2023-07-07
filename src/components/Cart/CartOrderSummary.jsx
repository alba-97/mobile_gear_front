import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../state/checkout/checkoutActions";
import { clearCart } from "../../state/cart/cartSlice";

export const CartOrderSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const checkoutLoading = useSelector((state) => state.checkout.loading);
  const checkoutError = useSelector((state) => state.checkout.error);
  const checkoutState = useSelector((state) => state.checkout);
  const deliveryAmount = 1000;

  const subtotal = Object.values(items).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch(checkout(Object.values(items)));
    dispatch(clearCart());
    navigate("/payments");
  };

  useEffect(() => {
    if (checkoutState.completed && !checkoutState.loading) {
      navigate("/payments");
    } else if (checkoutState.error) {
      alert("error en el checkout");
    }
  }, [checkoutState]);

  return (
    <Box
      p="4"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      w="100%"
    >
      <Heading as="h2" size="lg" mb="4">
        Order Summary
      </Heading>
      <Box mb="4">
        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text>Delivery: ${deliveryAmount.toFixed(2)}</Text>
      </Box>
      <Text fontSize="xl" mb="4">
        Total: ${(subtotal + deliveryAmount).toFixed(2)}
      </Text>
      <Button
        colorScheme="teal"
        width="full"
        onClick={handleCheckout}
        isLoading={checkoutLoading}
        isDisabled={checkoutLoading}
      >
        Checkout
      </Button>
    </Box>
  );
};
