import React from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({
  clientSecret,
  onError,
}: {
  clientSecret: string;
  onError?: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.log(
        "Stripe.js has not fully loaded yet or clientSecret is missing."
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/",
        },
      });

      console.log(result);

      if (result.error) {
        console.log("[error]", result.error.message);
        onError && onError();
      } else {
        console.log("Payment processed successfully!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements || !clientSecret}
      >
        Pay
      </button>
    </form>
  );
}
