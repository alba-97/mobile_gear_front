import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkoutSuccess } from "@/state/checkout/checkoutSlice";

export const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clientSecret } = useLocation().state as { clientSecret: string };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: cardElement },
      }
    );

    if (error) {
      toast({
        title: "Payment failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (paymentIntent?.status === "succeeded") {
      dispatch(checkoutSuccess());
      toast({
        title: "Payment successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/orders");
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="500px" mx="auto">
      <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </Box>
      <Button type="submit" colorScheme="blue" width="full" disabled={!stripe}>
        Pay Now
      </Button>
    </Box>
  );
};
