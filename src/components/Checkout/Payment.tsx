import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Box, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { StripePaymentForm } from "./StripePaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const Payment = () => {
  const location = useLocation();
  const clientSecret = location.state?.clientSecret;

  if (!clientSecret) {
    return <Box p={4}>Loading payment details...</Box>;
  }

  return (
    <Box p={4}>
      <Heading mb={4} textAlign="center">
        Complete Your Payment
      </Heading>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripePaymentForm />
      </Elements>
    </Box>
  );
};
